import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GameEvent, RsvpStatus, RsvpStatuses } from '../../types';

@Component({
  selector: 'app-my-next-game-tile',
  templateUrl: './my-next-game-tile.component.html',
  styleUrls: ['./my-next-game-tile.component.styl'],
})
export class MyNextGameTileComponent implements OnInit {

    nextGame: GameEvent;
    rsvpStatus: RsvpStatus;

    rsvpMessages = RsvpStatuses.RSVP_MESSAGES;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    @Input('game')
    set game(game: GameEvent) {
        if (game) {
            this.nextGame = game;
            this.rsvpStatus = this.nextGame.rsvp;
        }
    }

    @HostListener('click')
    onClick() {
        const redirect =
            this.nextGame ? ['/games', this.nextGame.id] : ['/games'];
        this.router.navigate(redirect);
    }
}
