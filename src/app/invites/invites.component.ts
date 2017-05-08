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
        this.teams = this.teams.concat([{ 'id': 135, 'name': 'My Fa', 'info': '', 'type': 2 } as Team]);
        this.games = this.games.concat([{ 'id': 346, 'teams': [], 'datetime': '2017-05-09T03:15:00Z', 'location': { 'id': 8, 'address': 'Test place v002, Granite bay park-6010 Douglas Blvd., Granite Bay, CA 95746', 'gis': null, 'name': 'Granite Bay Park' } } as GameEvent]);
        // this.profileService.getCurrentUserInvites(); TODO
    }

    rsvpStatusChanged(data:
        { gameId: number, rsvpId?: number, isDelete?: boolean }) {
        // TODO handle it
    }

}
