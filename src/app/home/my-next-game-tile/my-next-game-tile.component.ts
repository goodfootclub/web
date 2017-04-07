import { Component, OnInit } from '@angular/core';
import { GameEvent, RsvpStatus } from '../../types';
import { ProfileService } from '../../profile/profile.service';
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
        private profileService: ProfileService,
        private authService: AuthService,
    ) { }

    ngOnInit() {
        this.profileService.getCurrentUserGames(1).subscribe(data => {
            if (data && data instanceof Array && data.length > 0) {
                this.nextGame = data[0];
                const user = this.nextGame.playersById[
                    this.authService.profile.currentUser.id
                ];
                this.rsvpStatus = user.rsvp;
            }
        });
    }
}
