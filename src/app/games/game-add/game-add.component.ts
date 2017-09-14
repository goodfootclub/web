import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormArray,
    FormBuilder,
    Validators,
    FormControl,
    AbstractControl,
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

import { Location, Team } from 'app/types';
import { GamesService } from '../games.service';
import { LocationsService } from '../locations.service';
import { HistoryService } from '../../core/services/history.service';
import { ProfileService } from '../../profile/profile.service';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';

declare class GameAddFormControls {
    dates?: FormArray;
    teams?: FormArray;
    [key: string]: AbstractControl;
};

declare class GameAddFormGroup extends FormGroup {
    controls: GameAddFormControls;
}


@Component({
    selector: 'app-game-add',
    styleUrls: ['./game-add.component.styl'],
    templateUrl: './game-add.component.html',
})
export class GameAddComponent implements OnInit {

    get searchDebounceTime(): number { return 750; }
    get noTeam(): Team {
        return {
            id: null,
            info: '(Pickup game)',
            name: 'No team',
        } as Team;
    };
    form: GameAddFormGroup;
    locationAutoComplete: FormControl;
    locations: Location[];
    managedTeams: Team[] = [this.noTeam];
    targetTeam: number = null;
    tzOffset = moment().utcOffset() / 60;
    tzName = `GMT${this.tzOffset >= 0 ? '+' : '-'}${this.tzOffset}`;

    // local date, calculated in a weird way
    now = moment.utc().add(this.tzOffset, 'hours');

    controls: GameAddFormControls;
    locationControls: {
        name: FormControl,
        address: FormControl,
    };

    constructor(
        public _locations: LocationsService,
        public profileService: ProfileService,
        public formBuilder: FormBuilder,
        public games: GamesService,
        private historyService: HistoryService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this._locations.all().subscribe(locations => {
            this.locations = locations;
        });
        this.route.params.forEach((params: Params) => {
            this.targetTeam = +params['targetTeam'];
        });
        this.profileService.getCurrentUser()
            .subscribe(user => {
                this.managedTeams =
                    this.managedTeams.concat(user.managedTeams);
            });
        this.form = this.formBuilder.group({
            location: this.formBuilder.group({
                id: null,
                name: ['', Validators.compose([
                    Validators.required,
                    Validators.maxLength(30),
                ])],
                address: [
                    { value: '', disabled: false },
                    Validators.compose([
                        // Validators.required,
                        Validators.maxLength(255),
                    ]),
                ],
            }),
            teams: this.formBuilder.group({
                teamName: ['', Validators.required],
            }),
            dates: this.formBuilder.array([
                this.initMatchDate(),
            ]),
        }) as GameAddFormGroup;

        this.controls = this.form.controls;
        this.locationControls = this.controls['location']['controls'];

        this.controls['teams'].controls['teamName'].patchValue(
            this.managedTeams.find((team) =>
            team.id === (this.targetTeam ? this.targetTeam : null)));

        const _locationSubject: Subject<string> = new Subject();
        this.locationControls.name.valueChanges.subscribe(value => {
            if (value instanceof Location) {
                this.locationControls.address.patchValue(value.address);
            } else {
                _locationSubject.next(value);
            }
        });
        _locationSubject.debounceTime(this.searchDebounceTime)
            .subscribe(value => {
                this._locations.all(value).subscribe(locations => {
                    this.locations = locations;
                });
        });
    }

    initMatchDate(date?: string, time?: string): FormGroup {
        const now = moment();
        now.add(1, 'hours');
        now.minute(0);
        const timeStr = time ? time : now.format('HH:mm');
        const dateStr = date ? date : now.format('YYYY-MM-DD');
        return this.formBuilder.group({
            date: [dateStr, Validators.required],
            time: [timeStr, Validators.required],
        }, { validator: this.validateDateTime.bind(this) });
    }

    validateDateTime(group: FormGroup) {
        const value = group.value;
        const selectedDate = moment.utc(`${value.date}T${value.time}Z`,
            'YYYY-MM-DD HH:mm:ss'); // local date time
        return selectedDate.isAfter(this.now) ? null : { invalidDate: true };
    }

    displayTeam(team: Team) {
        return team.name ? team.name : team;
    }

    displayLocation(location: Location) {
        return location.name ? location.name : location;
    }

    onCancel() {
        this.historyService.back();
    }

    onSubmit() {
        const dates: string[] = this.form.value['dates']
            .map(({ date, time }) =>
                moment.utc(`${date}T${time}Z`).add(-this.tzOffset, 'hours'));
        const selectedTeam = this.form.value['teams']['teamName'] as Team;
        const teamsArray = selectedTeam.id == null ? [] : [selectedTeam.id];
        const selectedLocation: Location =
            this.form.value['location'].name instanceof Location ?
                this.form.value['location'].name :
                this.form.value['location'] as Location;
        let data = {
            location: selectedLocation,
            teams: teamsArray,
            datetimes: dates,
        };

        this.games.create(data).subscribe(newGame => {
            this.historyService.skipCurrent();
            this.router.navigate(['/games', newGame.id]);
        });
    }

    addDate() {
        const control = <FormArray>this.form.controls['dates'];
        const lastIndex = control.controls.length - 1;
        const previousDate: FormControl =
            control.controls[lastIndex]['controls'].date as FormControl;
        const previousTime: FormControl =
            control.controls[lastIndex]['controls'].time as FormControl;

        const nextDateStr =
            moment(`${previousDate.value} ${previousTime.value}`,
            'YYYY-MM-DD HH:mm:ss')
            .add(7, 'days').format('YYYY-MM-DD');

        control.push(this.initMatchDate(nextDateStr, previousTime.value));
    }

    removeDate() {
        const control = <FormArray>this.form.controls['dates'];
        control.removeAt(control.length - 1);
    }
}
