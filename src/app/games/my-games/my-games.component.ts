import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../title.service';
import { ProfileService } from '../../profile/profile.service';
import { GameEvent } from '../../types';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-my-games',
    templateUrl: './my-games.component.html',
    styleUrls: ['./my-games.component.styl']
})
export class MyGamesComponent implements OnInit {

    get limit(): number { return 50; };
    games: GameEvent[];

    canLoadMore = true;

    rsvpMessages = {
        2: 'In',
        1: 'Maybe',
        0: 'Out',
    };

    constructor(
        private profileService: ProfileService,
        private authService: AuthService,
        private title: TitleService,
    ) {
        this.title.setTitle('My games');
    }

    ngOnInit() {
        this.loadData().subscribe(games => {
            this.games = games;
            this.canLoadMore = games.length === this.limit;
        });
    }

    loadMore() {
        this.loadData(this.games.length)
            .subscribe(games => {
                this.games = this.games.concat(games);
                this.canLoadMore = games.length === this.limit;
            });
    }

    loadData(offset?: number): Observable<GameEvent[]> {
        return this.profileService.getCurrentUserGames(this.limit, offset);
    }

    getRsvpStatus(game: GameEvent) {
        const user = game.playersById[
            this.authService.profile.currentUser.id
        ];
        if (user && user.rsvp) {
            return this.rsvpMessages[user.rsvp];
        }
    }
}
