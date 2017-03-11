import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { TitleService } from 'app/title.service';
import { ProfileService } from 'app/profile';
import { Team, PlayerRole, GameEvent } from 'app/types';
import { TeamsService, playerRoles } from '../teams.service';

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
    scheduledGames: GameEvent[];
    isManager = false;
    isPlayer = false;
    canAskToJoin = true;
    selectedTab = this.TABS['0'];


    constructor(
        public route: ActivatedRoute,
        public teams: TeamsService,
        public title: TitleService,
        public profile: ProfileService,
    ) {
        title.setTitle('Team');
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.teamId = +params['id'];
            this.teams.get(this.teamId).subscribe(team => {
                this.team = team;
                this.title.setTitle(team.name);
                for (let player of team.players) {
                    if (player.id === this.profile.currentUser.id) {
                        this.canAskToJoin = false;
                        this.isPlayer = player.role >= PlayerRole.Substitute;
                        break;
                    }
                }
                for (let manager of team.managers) {
                    if (manager.id === this.profile.currentUser.id) {
                        this.isManager = true;
                        break;
                    }
                }
            });
        });
    }

    askToJoin() {
        this.teams.askToJoin(
            this.team.id, this.profile.currentUser.id)
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
