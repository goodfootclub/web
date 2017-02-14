import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { TitleService } from 'app/title.service';
import { TeamsService } from './teams.service';
import { Team } from 'app/types';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime';


@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.styl'],
})
export class TeamsComponent implements OnInit {

    get limit(): number { return 10; };
    get searchDebounceTime(): number { return 750; };
    isLoading = false;
    canLoadMore = true;

    form: FormGroup;
    search: AbstractControl;

    teams: Team[];

    constructor(
        public _teams: TeamsService,
        public formBuilder: FormBuilder,
        public title: TitleService) {
        title.setTitle('Teams');
    }

    ngOnInit() {
        this.form = this.formBuilder.group({'search': ['']});
        this.search = this.form.controls['search'];
        this.search.valueChanges.debounceTime(this.searchDebounceTime)
            .subscribe((value) => {
                this.loadData(value).subscribe(teams => {
                    this.teams = teams;
                    this.canLoadMore = teams.length === this.limit;
                });
            });
        this.loadData().subscribe(teams => {
            this.teams = teams;
            this.canLoadMore = teams.length === this.limit;
        });
    }
    loadMore() {
        this.isLoading = true;
        this.loadData(this.search.value, this.teams.length)
            .subscribe(players => {
                this.teams = this.teams.concat(players);
                this.canLoadMore = players.length === this.limit;
                this.isLoading = false;
            });
    }
    loadData(search?: string, offset?: number): Observable<Team[]> {
        return this._teams.all(search ? search : '', this.limit, offset);
    }
}
