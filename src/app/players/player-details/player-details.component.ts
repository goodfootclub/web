import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } from 'app/auth';
import { TitleService } from 'app/title.service';
import { PlayersService } from '../players.service';
import { User } from 'app/types';


@Component({
    selector: 'app-player-details',
    templateUrl: './player-details.component.html',
    styleUrls: [],
})
export class PlayerDetailsComponent implements OnInit {

    player: User;

    constructor(
        public auth: AuthService,
        public location: Location,
        public players: PlayersService,
        public route: ActivatedRoute,
        public router: Router,
        public title: TitleService,
    ) {
        title.setTitle('Player ');
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.players.get(id).subscribe(player => {
                this.player = player;
            });
        });
    }

    back() {
        // Check if user got there by nvigationg through the app or
        // by opening a link
        if (this.auth.activationsChecks > 2) {
            this.location.back();
        } else {
            this.router.navigate(['/']);
        }
    }
}
