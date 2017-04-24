import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GameEvent } from '../../types';

@Component({
    selector: 'app-pickup-games-tile',
    templateUrl: './pickup-games-tile.component.html',
    styleUrls: ['./pickup-games-tile.component.styl'],
})
export class PickupGamesTileComponent implements OnInit {

    games: GameEvent[];

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    @Input('nextGames')
    set nextGames(games: GameEvent[]) {
        this.games = games;
    }

    @HostListener('click')
    onClick() {
        this.router.navigate(['/games']);
    }
}
