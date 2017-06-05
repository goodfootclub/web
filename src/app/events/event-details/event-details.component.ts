import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { EventsService } from '../events.service';
import { GameEvent, RsvpStatuses } from '../../types';
import { ProfileService } from '../../profile/profile.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/forkJoin';

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.styl'],
})
export class EventDetailsComponent implements OnInit {

    event: GameEvent;
    editMode = false;
    user;
    rsvpMessages = RsvpStatuses.RSVP_MESSAGES;

    constructor(
        private events: EventsService,
        private route: ActivatedRoute,
        private profileService: ProfileService,
    ) { }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            Observable.forkJoin(
                this.profileService.getCurrentUser(),
                this.events.get(id),
            ).subscribe(arr => {
                this.user = arr[0];
                this.event = arr[1];
                this.user = this.event.playersById[
                    this.user.id
                ];
            });
        });
    }

    setStatus(status: number) {
        this.events.setStatus(this.event, this.user, status).subscribe(() => {
            this.events.get(this.event.id).subscribe(event => {
                this.user = event.playersById[
                    this.user.id
                ];
                this.event = event;
            });
        });
    }
}
