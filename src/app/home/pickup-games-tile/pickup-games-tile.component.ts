import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../games/games.service';
import { GameEvent } from '../../types';

@Component({
  selector: 'app-pickup-games-tile',
  templateUrl: './pickup-games-tile.component.html',
  styleUrls: ['./pickup-games-tile.component.styl']
})
export class PickupGamesTileComponent implements OnInit {

    games: GameEvent[];

    constructor(
        private gamesService: GamesService,
    ) { }

    ngOnInit() {
        this.gamesService.all('', 2).subscribe((games) => {
            this.games = games;
        });
    }

}
