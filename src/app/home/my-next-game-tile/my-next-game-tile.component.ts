import { Component, OnInit, Input } from '@angular/core';
import { GameEvent, RsvpStatus } from '../../types';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-my-next-game-tile',
  templateUrl: './my-next-game-tile.component.html',
  styleUrls: ['./my-next-game-tile.component.styl']
})
export class MyNextGameTileComponent implements OnInit {

    nextGame: GameEvent;
    rsvpStatus: RsvpStatus;

    rsvpMessages = {
        2: 'In',
        1: 'Maybe',
        0: 'Out',
    };

    constructor(
        private authService: AuthService,
    ) { }

    ngOnInit() {
    }

    @Input('game')
    set game(game: GameEvent) {
        if (game) {
            this.nextGame = game;
            const user = this.nextGame.playersById[
                this.authService.profile.currentUser.id
                ];
            this.rsvpStatus = user.rsvp;
        }
    }
}
