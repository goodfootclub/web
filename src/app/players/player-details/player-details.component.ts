import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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
        public players: PlayersService,
        public route: ActivatedRoute,
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
}
