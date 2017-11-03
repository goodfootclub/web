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

import { Location, Team} from 'app/types';
import { GamesService } from '../games.service';
import { LocationsService } from '../locations.service';
import { HistoryService } from '../../core/services/history.service';
import { ProfileService } from '../../profile/profile.service';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';

declare class GameEditFormControls {
    dates?: FormArray;
    teams?: FormArray;
    [key: string]: AbstractControl;
};

declare class GameEditFormGroup extends FormGroup {
    controls: GameEditFormControls;
}


@Component({
    selector: 'app-game-edit',
    styleUrls: ['./game-edit.component.styl'],
    templateUrl: './game-edit.component.html',
})
export class GameEditComponent implements OnInit {

    get searchDebounceTime(): number { return 750; }
    get noTeam(): Team {
        return {
            id: null,
            info: '(Pickup game)',
            name: 'No team',
        } as Team;
    };
    title = 'Create a game';
    form: GameEditFormGroup;
    locationAutoComplete: FormControl;
    locations: Location[];
    managedTeams: Team[] = [this.noTeam];
    targetTeam: number = null;
    tzOffset = moment().utcOffset() / 60;
    tzName = `GMT${this.tzOffset >= 0 ? '+' : '-'}${this.tzOffset}`;

    // local date, calculated in a weird way
    now = moment.utc().add(this.tzOffset, 'hours');

    controls: GameEditFormControls;
    locationControls: {
        name: FormControl,
        address: FormControl,
    };

    isEdit = false;

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
            const editTeamId = +params['id'];
            if (editTeamId) {
                this.title = 'Edit a game';
                this.isEdit = true;
                this.games.get(editTeamId).subscribe(game => {
                    this.title = game.getName();
                    this.form.patchValue(game);
                    if (game.teams && game.teams[0]) {
                        this.controls['teams'].controls['teamName'].patchValue(
                            this.managedTeams.find((team) =>
                            team.id === game.teams[0].id));
                    }
                    if (game.datetime && game.datetime[0]) {
                        const gameDateTime = moment.utc(game.datetime[0])
                            .local();
                        const gameDateControl =
                        (this.form.controls['dates'] as FormArray).controls[0];
                        gameDateControl.patchValue({
                            date: gameDateTime.format('YYYY-MM-DD'),
                            time: gameDateTime.format('HH:mm'),
                        });
                    }
                });
            }
        });
        this.profileService.getCurrentUser()
            .subscribe(user => {
                this.managedTeams =
                    this.managedTeams.concat(user.managedTeams);
            });
        this.form = this.buildForm();
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
        const formData = this.form.value;
        const dates: string[] = formData['dates']
            .map(({ date, time }) =>
                moment.utc(`${date}T${time}Z`).add(-this.tzOffset, 'hours'));
        const selectedTeam = formData['teams']['teamName'] as Team;
        const teamsArray = selectedTeam.id == null ? [] : [selectedTeam.id];
        const selectedLocation: Location =
            formData['location'].name instanceof Location ?
                formData['location'].name :
                formData['location'] as Location;
        let sub;
        if (this.isEdit) {
            sub = this.games.update({
                id: formData.id,
                name: formData.name,
                location: selectedLocation,
                teams: teamsArray,
                datetime: dates[0],
            });
        } else {
            sub = this.games.create({
                name: formData.name,
                location: selectedLocation,
                teams: teamsArray,
                datetimes: dates,
            });
        }
        sub.subscribe(newGame => {
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

    private buildForm(): GameEditFormGroup {
        const form = this.formBuilder.group({
            id: [],
            name: ['Pickup game', Validators.compose([
                Validators.required,
                Validators.maxLength(50),
            ])],
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
        }) as GameEditFormGroup;

        this.controls = form.controls;
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
        form.controls['name'].valueChanges.subscribe(value => {
            if (this.isEdit) { this.title = value; }
        });
        _locationSubject.debounceTime(this.searchDebounceTime)
            .subscribe(value => {
                this._locations.all(value).subscribe(locations => {
                    this.locations = locations;
                });
            });
        return form;
    }
}
