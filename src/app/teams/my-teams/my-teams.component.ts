import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../core/services/title.service';
import { TeamsService } from '../teams.service';
import { Team } from '../../types';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-my-teams',
    templateUrl: './my-teams.component.html',
    styleUrls: [
        './my-teams.component.styl',
    ],
})
export class MyTeamsComponent implements OnInit {

    teams: Team[];
    managedTeams: Team[];

    constructor(
        private teamsService: TeamsService,
        private title: TitleService,
    ) {
        this.title.setTitle('My teams');
    }

    ngOnInit() {
        Observable.forkJoin(
            this.teamsService.getCurrentUserTeams().map(res => res.results),
            this.teamsService.getUserManagedTeams().map(res => res.results))
            .subscribe((list) => {
                this.teams = list[0];
                this.managedTeams = list[1];
            });
    }
}
