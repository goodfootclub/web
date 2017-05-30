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
import { DatePipe } from '@angular/common';

import { Location, Team } from 'app/types';
import { GamesService } from '../games.service';
import { LocationsService } from '../locations.service';

import 'rxjs/add/operator/debounceTime';
import { ProfileService } from '../../profile/profile.service';
import { Subject } from 'rxjs/Subject';


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
    datePipe = new DatePipe('en-US');
    tzOffset = -new Date().getTimezoneOffset() / 60;
    tzName = `GMT${this.tzOffset >= 0 ? '+' : '-'}${this.tzOffset}`;

    controls: GameAddFormControls;
    locationControls: {
        name: FormControl,
        address: FormControl,
    };

    constructor(
        public _locations: LocationsService,
        public _profile: ProfileService,
        public formBuilder: FormBuilder,
        public games: GamesService,
        public router: Router,
        public route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this._locations.all().subscribe(locations => {
            this.locations = locations;
        });
        this.route.params.forEach((params: Params) => {
            this.targetTeam = +params['targetTeam'];
        });
        this.managedTeams =
            this.managedTeams.concat(this._profile.currentUser.managedTeams);
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
        });

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
        const now = new Date();
        now.setMinutes(0);
        now.setHours(now.getHours() + 1);
        const timeStr = time ? time : this.datePipe.transform(now, 'HH:mm');
        const dateStr = date ? date :
            this.datePipe.transform(now, 'yyyy-MM-dd');
        return this.formBuilder.group({
            date: [dateStr, Validators.required],
            time: [timeStr, Validators.required],
        }, { validator: this.validateDateTime.bind(this) });
    }

    validateDateTime(group: FormGroup) {
        const value = group.value;
        const selectedDate = new Date(`${value.date}T${value.time}`);
        const now = new Date();
        return selectedDate > now ? null : { invalidDate: true };
    }

    displayTeam(team: Team) {
        return team.name ? team.name : team;
    }

    displayLocation(location: Location) {
        return location.name ? location.name : location;
    }

    dateFromInputValue(val: {date: string, time: string}): Date {
        let dt = new Date(`${val['date']}T${val['time']}`);
        dt.setHours(dt.getHours() + dt.getTimezoneOffset() / 60);
        return dt;
    }

    onSubmit() {
        const dates: string[] = this.form.value['dates']
            .map(({ date, time }) => new Date(`${date}T${time}`));
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

        const nextDate = this.dateFromInputValue({
            date: previousDate.value,
            time: previousTime.value,
        });

        nextDate.setDate(nextDate.getDate() + 7);
        const nextDateStr = this.datePipe.transform(nextDate, 'yyyy-MM-dd');
        control.push(this.initMatchDate(nextDateStr, previousTime.value));
    }

    removeDate() {
        const control = <FormArray>this.form.controls['dates'];
        control.removeAt(control.length - 1);
    }
}
