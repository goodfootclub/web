import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { TitleService } from 'app/title.service';
import { ProfileService } from 'app/profile';
import { Team, PlayerRole, GameEvent, User } from 'app/types';
import { TeamsService, playerRoles } from '../teams.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/forkJoin';

@Component({
    selector: 'app-team-details',
    styleUrls: ['./team-details.component.styl'],
    templateUrl: './team-details.component.html',
})
export class TeamDetailsComponent implements OnInit {

    TABS = {
        '0': 'Info',
        '1': 'Schedule',
        '2': 'Chat',
    };

    ROLES = playerRoles;
    teamId: number;
    team: Team;
    user: User;
    scheduledGames: GameEvent[];
    isManager = false;
    isPlayer = false;
    canAskToJoin = true;
    selectedTab = this.TABS['0'];


    constructor(
        public route: ActivatedRoute,
        public teams: TeamsService,
        public title: TitleService,
        public profileService: ProfileService,
    ) {
        title.setTitle('Team');
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.teamId = +params['id'];
            Observable.forkJoin(
                this.profileService.getCurrentUser(),
                this.teams.get(this.teamId),
            ).subscribe(arr => {
                this.user = arr[0];
                this.team = arr[1];
                this.title.setTitle(this.team.name);
                for (let player of this.team.players) {
                    if (player.id === this.user.id) {
                        this.canAskToJoin = false;
                        this.isPlayer = player.role >= PlayerRole.Substitute;
                        break;
                    }
                }
                for (let manager of this.team.managers) {
                    if (manager.id === this.user.id) {
                        this.isManager = true;
                        break;
                    }
                }
            });
        });
    }

    askToJoin() {
        this.teams.askToJoin(
            this.team.id, this.user.id)
            .subscribe(console.log);
    }

    selectedIndexChange(index) {
        this.selectedTab = this.TABS[+index];
        if (this.selectedTab === 'Schedule' && !this.scheduledGames) {
            this.teams.getGames(this.teamId).subscribe(games => {
                this.scheduledGames = games;
            });
        }
    }
}
