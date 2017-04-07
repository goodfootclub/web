import { Component, OnInit } from '@angular/core';
import { GameEvent } from '../../types';
import { ProfileService } from '../../profile/profile.service';

@Component({
  selector: 'app-my-next-game-tile',
  templateUrl: './my-next-game-tile.component.html',
  styleUrls: ['./my-next-game-tile.component.styl']
})
export class MyNextGameTileComponent implements OnInit {

    nextGame: GameEvent;

    constructor(
        private profileService: ProfileService,
    ) { }

    ngOnInit() {
        this.profileService.getCurrentUserGames(1).subscribe(data => {
            if (data && data instanceof Array && data.length > 0) {
                this.nextGame = data[0];
            }
        });
    }
}
