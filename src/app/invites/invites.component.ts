import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../profile/profile.service';
import { GameEvent, Player, Team, PlayerRole, User } from '../types';
import { TitleService } from '../core/services/title.service';
import { GamesService } from '../games/games.service';
import { TeamsService } from '../teams/teams.service';
import { InvitesService } from './invites.service';

@Component({
    selector: 'app-invites',
    templateUrl: './invites.component.html',
    styleUrls: ['./invites.component.styl'],
})
export class InvitesComponent implements OnInit {

    user: User;
    teams: Team[] = [];
    games: GameEvent[] = [];

    constructor(
        private profileService: ProfileService,
        private invitesService: InvitesService,
        private gamesService: GamesService,
        private teamsService: TeamsService,
        private title: TitleService,
    ) {
        title.setTitle('Your invites');
    }

    ngOnInit() {
        this.profileService.getCurrentUser().subscribe((user) => {
            this.user = user;
        });
        this.loadTeamInvites();
        this.loadGameInvites();
    }

    teamInviteStatusChanged(data:
        { team: Team, accepted?: boolean, declined?: boolean }) {
        if (data.accepted) {
            const player: Player =
                new Player(Object.assign(
                    { role_id: data.team.roleId }, this.user));
            player.role = PlayerRole.Field;
            this.teamsService
                .updateTeamPlayer(data.team.id, player.roleId, player)
                .subscribe(this.loadTeamInvites.bind(this));
        } else if (data.declined) {
            this.teamsService.excludeTeamPlayer(data.team.id, data.team.roleId)
                .subscribe(this.loadTeamInvites.bind(this));
        }
    }

    rsvpStatusChanged(data:
        { game: GameEvent, rsvpId?: number, isDelete?: boolean }) {
        const player = new Player(data.game);
        if (data.isDelete) {
            this.gamesService.removePlayer(data.game.id, player)
                .subscribe(this.loadGameInvites.bind(this));
        } else {
            this.gamesService.setStatus(data.game.id, player, data.rsvpId)
                .subscribe(this.loadGameInvites.bind(this));
        }
    }

    private loadTeamInvites() {
        this.invitesService.getCurrentUserTeamInvites().subscribe((data) => {
            this.teams = data.results;
        });
    }

    private loadGameInvites() {
        this.invitesService.getCurrentUserGameInvites().subscribe((data) => {
            this.games = data.results;
        });
    }
}
