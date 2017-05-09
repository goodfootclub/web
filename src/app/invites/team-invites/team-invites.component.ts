import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from '../../types';

@Component({
    selector: 'app-team-invites',
    templateUrl: './team-invites.component.html',
    styleUrls: ['./team-invites.component.styl'],
})
export class TeamInvitesComponent implements OnInit {

    @Output() inviteStatusChanged: EventEmitter<any> = new EventEmitter();

    @Input('teams')
    teams: Team[];

    constructor() { }

    ngOnInit() {}

    acceptTeamInv(team: Team) {
        this.inviteStatusChanged.next( { team: team, accepted: true } );
    }

    declineTeamInv(team: Team, event: Event) {
        event.stopPropagation();
        this.inviteStatusChanged.next( { team: team, declined: true } );
    }

    handleFooterClick(event: Event) {
        event.stopPropagation();
    }

}
