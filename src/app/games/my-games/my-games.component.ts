import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../title.service';
import { GamesService } from '../games.service';
import { GameEvent } from '../../types';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-my-games',
    templateUrl: './my-games.component.html',
    styleUrls: [
        './my-games.component.styl',
    ],
})
export class MyGamesComponent implements OnInit {

    get limit(): number { return 50; };

    games: GameEvent[];

    canLoadMore = true;

    constructor(
        private gamesService: GamesService,
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
        return this.gamesService.getCurrentUserGames(this.limit, offset)
            .map(res => res.results);
    }
}
