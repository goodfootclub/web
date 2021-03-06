import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { GamesService } from './games.service';
import { TitleService } from '../core/services/title.service';
import { GameEvent } from 'app/types';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'app-games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.styl'],
})
export class GamesComponent implements OnInit {

    get limit(): number { return 50; };
    get searchDebounceTime(): number { return 750; };
    canLoadMore = true;

    form: FormGroup;
    search: AbstractControl;

    games: GameEvent[];

    constructor(
        public _games: GamesService,
        public formBuilder: FormBuilder,
        public title: TitleService,
    ) {
        title.setTitle('Find a game');
    }

    ngOnInit() {
        this.form = this.formBuilder.group({ 'search': [''] });
        this.search = this.form.controls['search'];
        this.search.valueChanges.debounceTime(this.searchDebounceTime)
            .subscribe((value) => {
                this.loadData(value).subscribe(games => {
                    this.games = games;
                    this.canLoadMore = games.length === this.limit;
                });
            });
        this.loadData().subscribe(games => {
            this.games = games;
            this.canLoadMore = games.length === this.limit;
        });
    }
    loadMore() {
        this.loadData(this.search.value, this.games.length)
            .subscribe(games => {
                this.games = this.games.concat(games);
                this.canLoadMore = games.length === this.limit;
            });
    }
    loadData(search?: string, offset?: number): Observable<GameEvent[]> {
        return this._games.all(search ? search : '', this.limit, offset);
    }
}
