import { Component, OnInit } from '@angular/core';
import { GamesService } from './games.service';
import { TitleService } from 'app/title.service';
import { GameEvent } from 'app/types';


@Component({
    selector: 'app-games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.styl'],
})
export class GamesComponent implements OnInit {

    games: GameEvent[];

    constructor(
        public _games: GamesService,
        public title: TitleService) {
        title.setTitle('Find a game');
    }

    ngOnInit() {
        this._games.all().subscribe(games => {
            this.games = games;
        });
    }
}
