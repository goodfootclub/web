import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../title.service';
import { ProfileService } from '../../profile/profile.service';
import { Team } from '../../types';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/auth.service';


@Component({
    selector: 'app-my-teams',
    templateUrl: './my-teams.component.html',
    // styleUrls: [
    //     './my-teams.component.styl',
    // ],
})
export class MyTeamsComponent implements OnInit {

    get limit(): number { return 50; };
    teams: Team[];

    canLoadMore = true;

    roleNames = {
        [3]: 'Captain',
        [2]: 'Player',
        [1]: 'Substitute',
        [0]: 'Inactive',
        [-1]: 'Invited',
        [-2]: 'Asked to join',
    };

    constructor(
        private profileService: ProfileService,
        private authService: AuthService,
        private title: TitleService,
    ) {
        this.title.setTitle('My teams');
    }

    ngOnInit() {
        this.loadData().subscribe(teams => {
            this.teams = teams;
            this.canLoadMore = teams.length === this.limit;
        });
    }

    loadMore() {
        this.loadData(this.teams.length)
            .subscribe(teams => {
                this.teams = this.teams.concat(teams);
                this.canLoadMore = teams.length === this.limit;
            });
    }

    loadData(offset?: number): Observable<Team[]> {
        return this.profileService.getCurrentUserTeams(this.limit, offset)
            .map(res => res.results);
    }

    getRole(team: Team) {
        if (team) {
            return this.roleNames[team.role];
        }
    }
}
