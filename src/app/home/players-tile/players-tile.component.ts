import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../types';

@Component({
  selector: 'app-players-tile',
  templateUrl: './players-tile.component.html',
  styleUrls: ['./players-tile.component.styl'],
})
export class PlayersTileComponent implements OnInit {

    playersCount = 0;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    @Input('players')
    set players(players: User[]) {
        if (players && players instanceof Array) {
            this.playersCount = players.length;
        }
    }

    @HostListener('click')
    onClick() {
        this.router.navigate(['/players']);
    }
}
