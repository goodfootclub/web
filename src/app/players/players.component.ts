import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { TitleService } from '../title.service';
import { PlayersService } from './players.service';
import { User } from '../types';

import "rxjs/add/operator/debounceTime"

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.styl'],
})
export class PlayersComponent implements OnInit {

    get limit(): number { return 20; };
    get searchDebounceTime(): number { return 750; };
    isLoading: boolean = false;
    canLoadMore: boolean = true;

    form: FormGroup;
    search: AbstractControl;

    players: User[];
    targetTeam: number;

    constructor(
        public _players: PlayersService,
        public formBuilder: FormBuilder,
        public route: ActivatedRoute,
        public title: TitleService,
    ) {
        title.setTitle('Players');
    }

    ngOnInit() {
        this.form = this.formBuilder.group({'search': ['']});
        this.search = this.form.controls['search'];
        this.search.valueChanges.debounceTime(this.searchDebounceTime)
            .subscribe((value) => {
                this.loadData(value).subscribe(players => {
                    this.players = players;
                    this.canLoadMore = players.length === this.limit;
                });
            });

        this.route.params.forEach((params: Params) => {
            this.targetTeam = +params['targetTeam'];
        });

        this.loadData().subscribe(players => {
            this.players = players;
            this.canLoadMore = players.length === this.limit;
        });
    }

    loadMore() {
        this.isLoading = true;
        this.loadData(this.search.value, this.players.length).subscribe(players => {
            this.players = this.players.concat(players);
            this.canLoadMore = players.length === this.limit;
            this.isLoading = false;
        });
    }

    loadData(search?:string, offset?:number):Observable<User[]> {
        return this._players.all(search ? search : '', this.limit, offset);
    }
}
