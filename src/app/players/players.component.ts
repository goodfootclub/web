import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { TitleService } from '../title.service';
import { PlayersService } from './players.service';
import { User } from '../types';


@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.styl'],
})
export class PlayersComponent implements OnInit {

    players: User[];
    targetTeam: number;


    constructor(
        public _players: PlayersService,
        public route: ActivatedRoute,
        public title: TitleService,
    ) {
        title.setTitle('Players');
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.targetTeam = +params['targetTeam'];
        });

        this._players.all().subscribe(players => {
            this.players = players;
        });
    }
}
