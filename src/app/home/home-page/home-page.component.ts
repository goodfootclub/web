import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ProfileService } from 'app/profile';
import { User, GameEvent } from 'app/types';
import { GamesService } from '../../games/games.service';
import { PlayersService } from '../../players/players.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.styl'],
})
export class HomePageComponent implements OnInit {

    user: User;
    userNextGame: GameEvent;
    nextGames: GameEvent[];
    players: User[];

    @Output()
    handleLogout: EventEmitter<boolean> = new EventEmitter();

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

    logout() {
        this.profile.logout().subscribe(() => {
            this.handleLogout.emit(false);
        });
    }
}
