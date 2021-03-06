import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from 'app/common';
import { TeamsComponent } from './teams.component';
import { MyTeamsComponent } from './my-teams';
import { TeamAddComponent } from './team-add';
import { TeamEditComponent, EditRoleComponent } from './team-edit';
import { TeamDetailsComponent } from './team-details';
import { TeamsService } from './teams.service';
import { GamesService } from '../games/games.service';
import { TeamsListComponent } from './teams-list/teams-list.component';
import { MaterialModule } from 'app/material/material.module';


const ROUTES: Routes = [{
    path: '', component: TeamsComponent,
}, {
    path: 'add', component: TeamAddComponent,
}, {
    path: 'my', component: MyTeamsComponent,
}, {
    path: ':id/edit', component: TeamEditComponent,
}, {
    path: ':id', component: TeamDetailsComponent,
}];


@NgModule({
    imports: [
        MaterialModule,
        AppCommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
    ],
    providers: [
        TeamsService,
        GamesService,
    ],
    declarations: [
        MyTeamsComponent,
        TeamAddComponent,
        TeamEditComponent,
        TeamDetailsComponent,
        TeamsComponent,
        EditRoleComponent,
        TeamsListComponent,
    ],
    entryComponents: [
        EditRoleComponent,
    ],
})
export class TeamsModule { }
