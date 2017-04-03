import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../players/players.service';
import { Player } from '../../types';

@Component({
  selector: 'app-players-tile',
  templateUrl: './players-tile.component.html',
  styleUrls: ['./players-tile.component.styl']
})
export class PlayersTileComponent implements OnInit {

    player: Player;

    constructor(
        private playersService: PlayersService,
    ) { }

    ngOnInit() {
        this.playersService.all('', 15).subscribe((players) => {
            const size = players.length;
            const index = Math.floor(Math.random() * size);
            this.player = players[index] as Player;
        });
    }
}
