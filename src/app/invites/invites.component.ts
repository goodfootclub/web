import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../profile/profile.service';
import { GameEvent, Team } from '../types';
import { TitleService } from '../title.service';

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
        private title: TitleService,
    ) {
        title.setTitle('Your invites');
    }

    ngOnInit() {
        this.profileService.getCurrentUserGameInvites().subscribe((data) => {
            this.games = data.results;
        });
        this.profileService.getCurrentUserTeamInvites().subscribe((data) => {
            this.teams = data.results;
        });
    }

    acceptTeamInv(team: Team) {
        // TODO
        // this.profileService
    }

    declineTeamInv(team: Team, event: Event) {
        // TODO remove invitation
        event.stopPropagation();
    }

    handleFooterClick(event: Event) {
        event.stopPropagation();
    }

    rsvpStatusChanged(data:
        { gameId: number, rsvpId?: number, isDelete?: boolean }) {
        // TODO handle it
    }

}
