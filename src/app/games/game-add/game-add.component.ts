import { Component, HostListener } from '@angular/core';
import {
    FormGroup,
    FormArray,
    FormBuilder,
    Validators,
    FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Location } from 'app/types';
import { GamesService } from '../games.service';
import { LocationsService } from '../locations.service';

import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'app-game-add',
    styleUrls: ['./game-add.component.styl'],
    templateUrl: './game-add.component.html',
})
export class GameAddComponent {

    get searchDebounceTime(): number { return 750; }
    form: FormGroup;
    locations: Location[];
    showLocationsList = false;
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
        public formBuilder: FormBuilder,
        public games: GamesService,
        public router: Router,
    ) {
        _locations.all().subscribe(locations => {
            this.locations = locations;
        });
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
                team1Name: ['', Validators.required],
                team2Name: ['', Validators.required],
            }),
            dates: this.formBuilder.array([
                this.initMatchDate(),
            ]),
        });

        this.controls = this.form.controls;
        this.locationControls = this.form.controls['location']['controls'];

        this.locationControls.name.valueChanges
            .debounceTime(this.searchDebounceTime).subscribe(value => {
            _locations.all(value).subscribe(locations => {
                this.locations = locations;
            });
        });
    }

    initMatchDate(date?: string, time?: string): FormGroup {
        const now = new Date();
        const timeStr = date ? date : this.datePipe.transform(now, 'HH:mm');
        const dateStr = time ? time :
            this.datePipe.transform(now, 'yyyy-MM-dd');
        return this.formBuilder.group({
            date: [dateStr, Validators.required],
            time: [timeStr, Validators.required],
        });
    }

    onSubmit() {
        this.isPosting = true;
        this.form.disable();
        const dates: string[] = this.form.value['dates'].map((val) => {
            let dt = new Date(
                `${val['date']}T${val['time']}`);
            dt.setHours(dt.getHours() + dt.getTimezoneOffset() / 60);
            return dt.toJSON();
        });
        let data = {
            location: this.form.value['location'],
            teams: [],
            dates: dates,
        };

        this.games.create(data).subscribe(newGame => {
            this.router.navigate(['/games', newGame.id]);
        });
    }

    addDate() {
        const control = <FormArray>this.form.controls['dates'];
        control.push(this.initMatchDate());
    }

    removeDate(index: number) {
        const control = <FormArray>this.form.controls['dates'];
        control.removeAt(index);
    }

    setLocation(event: Event, location: Location) {
        this.form.patchValue({location: location});
    }

    @HostListener('window:click')
    closeLocationsPopup() {
        this.showLocationsList = false;
    }

    openLocationsPopup(event: Event) {
        this.showLocationsList = true;
        event.stopPropagation();
    }
}
