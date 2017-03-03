import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EventsService } from '../events.service';
import { AuthService } from '../../auth/auth.service';
import { GameEvent } from '../../types';


@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.styl'],
})
export class EventDetailsComponent implements OnInit {

    event: GameEvent;
    editMode = false;
    user;
    rsvpMessages = {
        2: 'In',
        1: 'Maybe',
        0: 'Out',
    };

    constructor(
        private events: EventsService,
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthService,
    ) { }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.events.get(id).subscribe(event => {
                this.user = event.playersById[
                    this.auth.profile.currentUser.id
                ];
                this.event = event;
            });
        });
    }

    setStatus(status: number) {
        this.events.setStatus(this.event, this.user, status).subscribe(() => {
            this.events.get(this.event.id).subscribe(event => {
                this.user = event.playersById[
                    this.auth.profile.currentUser.id
                ];
                this.event = event;
            });
        });
    }
}
