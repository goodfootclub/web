import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppCommonModule } from 'app/common';
import { InvitesComponent } from './invites.component';
import { TeamInvitesComponent } from './team-invites/team-invites.component';
import { GamesService } from '../games/games.service';
import { TeamsService } from '../teams/teams.service';
import { InvitesService } from './invites.service';
import { MaterialModule } from '../material/material.module';

const ROUTER_CONFIG = [
    { path: '', component: InvitesComponent },
];

@NgModule({
    imports: [
        MaterialModule,
        RouterModule.forChild(ROUTER_CONFIG),
        AppCommonModule,
    ],
    declarations: [InvitesComponent, TeamInvitesComponent],
    providers: [
        InvitesService,
        GamesService,
        TeamsService,
    ],
})
export class InvitesModule {}
