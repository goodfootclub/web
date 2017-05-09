import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../profile/profile.service';
import { GameEvent, Player, Team, PlayerRole } from '../types';
import { TitleService } from '../title.service';
import { GamesService } from '../games/games.service';
import { TeamsService } from '../teams/teams.service';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-invites',
    templateUrl: './invites.component.html',
    styleUrls: ['./invites.component.styl'],
})
export class InvitesComponent implements OnInit {

    teams: Team[] = [];
    games: GameEvent[] = [];

    constructor(
        private profileService: ProfileService,
        private gamesService: GamesService,
        private teamsService: TeamsService,
        private authService: AuthService,
        private title: TitleService,
    ) {
        title.setTitle('Your invites');
    }

    ngOnInit() {
        this.loadTeamInvites();
        this.loadGameInvites();
    }

    teamInviteStatusChanged(data:
        { team: Team, accepted?: boolean, declined?: boolean }) {
        const player: Player = data.team.playersById[
            this.authService.profile.currentUser.id
        ];
        player.role = PlayerRole.Field;
        if (data.accepted) {
            this.teamsService
                .updateTeamPlayer(data.team.id, player.roleId, player)
                .subscribe(this.loadTeamInvites.bind(this));
        } else if (data.declined) {
            this.teamsService.excludeTeamPlayer(data.team.id, player.roleId)
                .subscribe(this.loadTeamInvites.bind(this));
        }
    }

    rsvpStatusChanged(data:
        { game: GameEvent, rsvpId?: number, isDelete?: boolean }) {
        const player: Player = data.game.playersById[
            this.authService.profile.currentUser.id
        ];
        if (data.isDelete) {
            this.gamesService.removePlayer(data.game, player)
                .subscribe(this.loadGameInvites.bind(this));
        } else {
            this.gamesService.setStatus(data.game, player, data.rsvpId)
                .subscribe(this.loadGameInvites.bind(this));
        }
    }

    private loadTeamInvites() {
        this.profileService.getCurrentUserTeamInvites().subscribe((data) => {
            this.teams = data.results;
        });
    }

    private loadGameInvites() {
        this.profileService.getCurrentUserGameInvites().subscribe((data) => {
            // this.games = data.results;
            this.games = [ new GameEvent({ 'id': 390, 'teams': [], 'datetime': '2017-05-13T17:00:00Z', 'location': { 'id': 8, 'address': 'Test place v002, Granite bay park-6010 Douglas Blvd., Granite Bay, CA 95746', 'gis': null, 'name': 'Granite Bay Park' } })]
        });
    }

}
