import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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
        [3]: 'Captain',
        [2]: 'Player',
        [1]: 'Substitute',
        [0]: 'Inactive',
        [-1]: 'Invited',
        [-2]: 'Asked to join',
    };

    team: Team;

    constructor(
        public route: ActivatedRoute,
        public teams: TeamsService,
        public title: TitleService,
    ) {
        title.setTitle('Player');
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.teams.get(id).subscribe(team => {
                this.team = team;
            });
        });
    }
}
