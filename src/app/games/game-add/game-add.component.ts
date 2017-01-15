import { Component } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Location } from 'app/types';
import { GamesService } from '../games.service';
import { LocationsService } from '../locations.service';


@Component({
    selector: 'app-game-add',
    styleUrls: ['./game-add.component.styl'],
    templateUrl: './game-add.component.html',
})
export class GameAddComponent {

    form: FormGroup;
    locations: Location[];
    showLocationsList: boolean = false;
    isPosting: boolean = false;

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
                        Validators.required,
                        Validators.maxLength(255),
                    ]),
                ],
            }),
            date: [
                new Date().toJSON().split('T')[0],
                Validators.required,
            ],
        });

        this.controls = this.form.controls;
        this.locationControls = this.form.controls['location']['controls'];

        this.locationControls.name.valueChanges.subscribe(value => {

        });

    }

    onSubmit() {
        console.log(this.form);
        // this.isPosting = true;
        // this.form.disable();
        // this.games.create(this.form.value).subscribe(newGame => {
        //     this.router.navigate(['/games', newGame.id]);
        // });
    }

    setLocation(location: Location) {
        console.log(location);
        this.form.patchValue({location: location});
        this.showLocationsList = false;
    }

    showLocations() {
        this.showLocationsList = true;
    }

    hideLocations() {
        setTimeout(() => {
            this.showLocationsList = false;
        }, 0);
    }
}
