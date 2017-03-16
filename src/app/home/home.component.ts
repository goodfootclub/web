import { Component, OnInit } from '@angular/core';

import { ProfileService } from 'app/profile';
import { User, GameEvent } from 'app/types';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.styl'],
})
export class HomeComponent implements OnInit {

    get limit(): number { return 50; };

    user: User;
    games: GameEvent[] = [];

    isLoading = true;
    canLoadMore = true;

    constructor(private profile: ProfileService) {}

    ngOnInit(): void {
        this.profile.getCurrentUser().subscribe(user => {
            this.user = user;
        });
        this.loadGames().subscribe((games) => {
            this.games = games;
            this.canLoadMore = games.length === this.limit;
            this.isLoading = false;
        });
    }
    loadMore() {
        this.isLoading = true;
        this.loadGames(this.games.length)
            .subscribe(games => {
                this.games = this.games.concat(games);
                this.canLoadMore = games.length === this.limit;
                this.isLoading = false;
            });
    }
    loadGames(offset?: number): Observable<GameEvent[]> {
        return this.profile.getCurrentUserGames(this.limit, offset);
    }
}
