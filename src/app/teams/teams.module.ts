import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TeamsComponent } from './teams.component';


const ROUTES: Routes = [{
    path: '', component: TeamsComponent,
}, {
    path: '/:id', component: TeamsComponent,
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
    ],
    declarations: [TeamsComponent],
})
export class TeamsModule { }
