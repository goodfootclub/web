import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { TitleService } from 'app/title.service';
import { ProfileService } from 'app/profile';
import {Team, PlayerRole, GameEvent} from 'app/types';
import { TeamsService } from '../teams.service';
import {GamesService} from '../../games/games.service';




@Component({
    selector: 'app-team-details',
    styleUrls: ['./team-details.component.styl'],
    templateUrl: './team-details.component.html',
})
export class TeamDetailsComponent implements OnInit {

    ROLES = {
        [3]: 'Captain',
        [2]: 'Player',
        [1]: 'Substitute',
        [0]: 'Inactive',
        [-1]: 'Invited',
        [-2]: 'Asked to join',
    };

    TABS = {
        '0': 'Info',
        '1': 'Schedule',
        '2': 'Chat',
    };

    team: Team;
    scheduledGames: GameEvent[] = [];
    isManager = false;
    isPlayer = false;
    canAskToJoin = true;
    selectedTab = this.TABS['0'];


    constructor(
        public route: ActivatedRoute,
        public teams: TeamsService,
        public games: GamesService,
        public title: TitleService,
        public profile: ProfileService,
    ) {
        title.setTitle('Team');
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.teams.get(id).subscribe(team => {
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
            /* TODO for testing:
            this.games.all().subscribe(games => {
                this.scheduledGames = games;
            }); */
        });
    }

    selectedIndexChange(index) {
        this.selectedTab = this.TABS[+index];
    }
}
