import { Component, OnInit } from '@angular/core';
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

    constructor(public _players: PlayersService,
                public title: TitleService) {
        title.setTitle('Players');
    }

    ngOnInit() {
        this._players.all().subscribe(players => {
            this.players = players;
        });
    }
}
