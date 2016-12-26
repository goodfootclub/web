import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
    targetTeam: number;

    constructor(
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
            this.targetTeam = +params['targetTeam'];
            this.players.get(id).subscribe(player => {
                this.player = player;
            });
        });
    }

    invite() {
        this.players.inviteToTeam(this.targetTeam, this.player.id).subscribe(
            response => {
                this.router.navigate(['/teams', this.targetTeam]);
            },
        );
    }
}
