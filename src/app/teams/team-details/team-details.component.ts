import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } from 'app/auth';
import { TitleService } from 'app/title.service';
import { Team } from 'app/types';
import { TeamsService } from '../teams.service';


@Component({
    selector: 'app-team-details',
    styleUrls: ['./team-details.component.styl'],
    templateUrl: './team-details.component.html',
})
export class TeamDetailsComponent implements OnInit {

    ROLES = {
        3: 'Captain',
        2: 'Player',
        1: 'Substitute',
        0: 'Inactive',
        [-1]: 'Invited',
        [-2]: 'Asked to join',
    };

    team: Team;

    constructor(
        public auth: AuthService,
        public location: Location,
        public route: ActivatedRoute,
        public router: Router,
        public teams: TeamsService,
        public title: TitleService,
    ) {
        title.setTitle('Player ');
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.teams.get(id).subscribe(team => {
                this.team = team;
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
