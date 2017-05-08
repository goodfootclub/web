import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MdDialogModule } from '@angular/material';

import { CommonModule } from 'app/common';
import { TeamsComponent } from './teams.component';
import { MyTeamsComponent } from './my-teams';
import { TeamAddComponent } from './team-add';
import { TeamEditComponent, EditRoleComponent } from './team-edit';
import { TeamDetailsComponent } from './team-details';
import { TeamsService } from './teams.service';
import { GamesService } from '../games/games.service';


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
        MdDialogModule,
        CommonModule,
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
    ],
    entryComponents: [
        EditRoleComponent,
    ],
})
export class TeamsModule { }
