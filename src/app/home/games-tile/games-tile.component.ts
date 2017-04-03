import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile/profile.service';
import { GameEvent } from '../../types';

@Component({
  selector: 'app-games-tile',
  templateUrl: './games-tile.component.html',
  styleUrls: ['./games-tile.component.styl']
})
export class GamesTileComponent implements OnInit {

    game: GameEvent;

    constructor(
      private profile: ProfileService,
    ) { }

    ngOnInit() {
      this.profile.getCurrentUserGames(1).subscribe((games) => {
          this.game = games[0];
      });
    }

}
