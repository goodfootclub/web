import { Component, HostListener } from '@angular/core';
import {
    FormGroup,
    FormArray,
    FormBuilder,
    Validators,
    FormControl,
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';

import {Location, Team} from 'app/types';
import { GamesService } from '../games.service';
import { LocationsService } from '../locations.service';

import 'rxjs/add/operator/debounceTime';
import {ProfileService} from '../../profile/profile.service';

@Component({
    selector: 'app-game-add',
    styleUrls: ['./game-add.component.styl'],
    templateUrl: './game-add.component.html',
})
export class GameAddComponent {

    get searchDebounceTime(): number { return 750; }
    get noTeam(): Team {
        return {
            id: -1,
            info: '(Pickup game)',
            name: 'No team',
        } as Team;
    };
    form: FormGroup;
    locations: Location[];
    managedTeams: Team[] = [this.noTeam];
    targetTeam: number = null;
    isPosting = false;
    datePipe = new DatePipe('en-US');
    tzOffset = -new Date().getTimezoneOffset() / 60;
    tzName = `GMT${this.tzOffset >= 0 ? '+' : '-'}${this.tzOffset}`;

    controls: any;
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
    ) {
        _locations.all().subscribe(locations => {
            this.locations = locations;
        });
        this.route.params.forEach((params: Params) => {
            this.targetTeam = +params['targetTeam'];
        });
        this.managedTeams =
            this.managedTeams.concat(_profile.currentUser.managedTeams);
        this.form = this.formBuilder.group({
            location: this.formBuilder.group({
                id: null,
                name: ['', Validators.compose([
                    Validators.required,
                    Validators.maxLength(30),
                ])],
                address: [
                    {value: '', disabled: false},
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
                team.id === (this.targetTeam ? this.targetTeam : -1)));

        this.locationControls.name.valueChanges
            .debounceTime(this.searchDebounceTime).subscribe(value => {
            if (value instanceof Location) {
                this.locationControls.address.patchValue(value.address);
            } else {
                _locations.all(value).subscribe(locations => {
                    this.locations = locations;
                });
            }
        });
    }

    initMatchDate(date?: string, time?: string): FormGroup {
        const now = new Date();
        const timeStr = time ? time : this.datePipe.transform(now, 'HH:mm');
        const dateStr = date ? date :
            this.datePipe.transform(now, 'yyyy-MM-dd');
        return this.formBuilder.group({
            date: [dateStr, Validators.required],
            time: [timeStr, Validators.required],
        });
    }

    displayTeam(team: Team) {
        return team.name ? team.name : team;
    }

    displayLocation(location: Location) {
        return location.name ? location.name : location;
    }

    onSubmit() {
        this.isPosting = true;
        this.form.disable();
        const dates: string[] = this.form.value['dates'].map((val) => {
            let dt = new Date(
                `${val['date']}T${val['time']}`);
            dt.setHours(dt.getHours() + dt.getTimezoneOffset() / 60);
            return dt;
        });
        const selectedTeam = this.form.value['teams']['teamName'] as Team;
        const teamsArray = selectedTeam.id === -1 ? [] : [selectedTeam];
        const selectedLocation: Location =
            this.form.value['location'].name instanceof Location ?
                this.form.value['location'].name :
                this.form.value['location'] as Location;
        let data = {
            location: selectedLocation,
            teams: teamsArray,
            datetime: dates,
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
        const nextDate = new Date(previousDate.value);
        nextDate.setDate(nextDate.getDate() + 7);
        const nextDateStr = this.datePipe.transform(nextDate, 'yyyy-MM-dd');
        control.push(this.initMatchDate(nextDateStr, previousTime.value));
    }

    removeDate() {
        const control = <FormArray>this.form.controls['dates'];
        control.removeAt(control.length - 1);
    }
}
