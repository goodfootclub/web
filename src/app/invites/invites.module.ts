import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from 'app/common';
import { InvitesComponent } from './invites.component';
import { TeamInvitesComponent } from './team-invites/team-invites.component';
import { GamesService } from '../games/games.service';
import { TeamsService } from '../teams/teams.service';

const ROUTER_CONFIG = [
    { path: '', component: InvitesComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTER_CONFIG),
        CommonModule,
    ],
    declarations: [InvitesComponent, TeamInvitesComponent],
    providers: [
        GamesService,
        TeamsService,
    ],
})
export class InvitesModule {}
