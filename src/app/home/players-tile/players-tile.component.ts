import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../types';


@Component({
  selector: 'app-players-tile',
  templateUrl: './players-tile.component.html',
  styleUrls: ['./players-tile.component.styl']
})
export class PlayersTileComponent implements OnInit {

    playersCount = 0;

    constructor() { }

    ngOnInit() {
    }

    @Input('players')
    set players(players: User[]) {
        if (players && players instanceof Array) {
            this.playersCount = players.length;
        }
    }
}
