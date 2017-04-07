import { Component, Input, OnInit } from '@angular/core';
import { GameEvent } from '../../types';

@Component({
    selector: 'app-pickup-games-tile',
    templateUrl: './pickup-games-tile.component.html',
    styleUrls: ['./pickup-games-tile.component.styl']
})
export class PickupGamesTileComponent implements OnInit {

    games: GameEvent[];

    constructor() { }

    ngOnInit() {
    }

    @Input('nextGames')
    set nextGames(games: GameEvent[]) {
        this.games = games;
    }
}
