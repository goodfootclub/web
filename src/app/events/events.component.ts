import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service';
import { GameEvent } from './../types';
import { TitleService } from '../core/services/title.service';


@Component({
    selector: 'app-game-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.styl'],
})
export class EventsComponent implements OnInit {

    events: GameEvent[];
    empty = true;

    statusMessages =  [
        'I\'m going',
        'I\'m not sure',
        'I\'m not going',
    ];

    constructor(
        private _events: EventsService,
        public title: TitleService,
    ) { }

    ngOnInit() {
        this.title.setTitle('Your Games');
        this._events.all().subscribe(events => {
            this.events = events;
            this.empty = !events.length;
        });
    }

    showExamples() {

    }
}
