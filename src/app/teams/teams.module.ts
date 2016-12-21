import { NgModule } from '@angular/core';
import { CommonModule } from 'app/common';
import { RouterModule, Routes } from '@angular/router';

import { TeamsComponent } from './teams.component';
import { TeamDetailsComponent } from './team-details';
import { TeamsService } from './teams.service';


const ROUTES: Routes = [{
    path: '', component: TeamsComponent,
}, {
    path: ':id', component: TeamDetailsComponent,
}];


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
    ],
    providers: [TeamsService],
    declarations: [TeamsComponent, TeamDetailsComponent],
})
export class TeamsModule { }
