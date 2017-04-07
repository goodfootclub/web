import { Component, OnInit } from '@angular/core';

import { ProfileService } from 'app/profile';
import { User, GameEvent } from 'app/types';
import { GamesService } from '../games/games.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.styl'],
})
export class HomeComponent implements OnInit {

    user: User;
    userNextGame: GameEvent;
    nextGames: GameEvent[];

    constructor(
        private profile: ProfileService,
        private gamesService: GamesService,
    ) {}

    ngOnInit(): void {
        this.profile.getCurrentUser().subscribe(user => {
            this.user = user;
        });
        this.profile.getCurrentUserGames(1).subscribe(games => {
            if (games && games instanceof Array && games.length > 0) {
                this.userNextGame = games[0];
            }
        });
        this.gamesService.all('', 2).subscribe(games => {
            this.nextGames = games;
        });
    }

    sendMail() {
        // TODO mailTo:team@goodfoot.club
    }
}
