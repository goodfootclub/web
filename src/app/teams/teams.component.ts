import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';
import { TeamsService } from './teams.service';
import { Team } from 'app/types';


@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.styl'],
})
export class TeamsComponent implements OnInit {

    teams: Team[];

    constructor(public _teams: TeamsService, public title: TitleService) {
        title.setTitle('Teams');
    }

    ngOnInit() {
        this._teams.all().subscribe(teams => {
            this.teams = teams;
        });
    }

}
