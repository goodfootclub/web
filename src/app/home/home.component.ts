import { Component, OnInit } from '@angular/core';

import { ProfileService } from 'app/profile';
import { User, GameEvent } from 'app/types';
import { GamesService } from '../games/games.service';
import { PlayersService } from '../players/players.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.styl'],
})
export class HomeComponent implements OnInit {

    user: User;
    userNextGame: GameEvent;
    nextGames: GameEvent[];
    players: User[];

    constructor(
        private profile: ProfileService,
        private gamesService: GamesService,
        private playersService: PlayersService,
    ) {}

    ngOnInit(): void {
        this.profile.updateCurrentUser().subscribe(user => {
            this.user = user;
        });
        this.gamesService.getCurrentUserGames(1)
            .map(res => res.results)
            .subscribe(games => {
                if (games && games instanceof Array && games.length > 0) {
                    this.userNextGame = games[0];
                }
            });
        this.gamesService.all('', 2).subscribe(games => {
            this.nextGames = games;
        });
        this.playersService.all().subscribe(players => {
            this.players = players;
        });
    }
}
