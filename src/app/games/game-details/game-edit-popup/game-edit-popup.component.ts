import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GameEvent, Location } from '../../../types';
import { GamesService } from '../../games.service';
import { Subject } from 'rxjs/Subject';
import { LocationsService } from '../../locations.service';

@Component({
  selector: 'app-game-edit-popup',
  templateUrl: './game-edit-popup.component.html',
  styleUrls: ['./game-edit-popup.component.styl']
})
export class GameEditPopupComponent implements OnInit {

    get searchDebounceTime(): number { return 750; }

    game: GameEvent;
    form: FormGroup;
    locations: Location[];
    locationAutoComplete: FormControl;
    datePipe = new DatePipe('en-US');
    locationControls: {
        name: FormControl,
        address: FormControl,
    };
    tzOffset = -new Date().getTimezoneOffset() / 60;
    tzName = `GMT${this.tzOffset >= 0 ? '+' : '-'}${this.tzOffset}`;

    constructor(
        private gameService: GamesService,
        private locationService: LocationsService,
        private formBuilder: FormBuilder,
        private dialogRef: MdDialogRef<GameEditPopupComponent>,
    ) { }

    ngOnInit() {
        this.locationService.all().subscribe(locations => {
            this.locations = locations;
        });
    }

    public setGame(game: GameEvent) {
        this.game = game;
        this.form = this.buildForm(game);
        this.locationControls = this.form.controls['location']['controls'];
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
                this.locationService.all(value).subscribe(locations => {
                    this.locations = locations;
                });
            });
    }

    displayLocation(location: Location) {
        return location.name ? location.name : location;
    }

    onSubmit() {
        // TODO
    }

    private buildForm(game: GameEvent) {
        let dateString = game.datetime instanceof Array ?
            game.datetime[0] : game.datetime;
        const date = this.datePipe.transform(dateString, 'yyyy-MM-dd');
        const time = this.datePipe.transform(dateString, 'HH:mm');
        return this.formBuilder.group({
            location: this.formBuilder.group({
                id: null,
                name: ['', Validators.compose([
                    Validators.required,
                    Validators.maxLength(30),
                ])],
                address: [
                    { value: '', disabled: false },
                    Validators.compose([
                        Validators.maxLength(255),
                    ]),
                ],
            }),
            date: [date, Validators.required],
            time: [time, Validators.required],
        });
    }



}
