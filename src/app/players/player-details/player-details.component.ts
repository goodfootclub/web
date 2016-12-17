import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TitleService } from '../../title.service';
import { PlayersService } from '../players.service';
import { User } from '../../types';


@Component({
    selector: 'app-players',
    templateUrl: './player-details.component.html',
    styleUrls: [],
})
export class PlayerDetailsComponent implements OnInit {

    player: User;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public players: PlayersService,
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
