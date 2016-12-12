/**
 * Player (user) profile
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { ProfileComponent } from './profile.component';


const ROUTES: Routes = [{
    path: '', component: ProfileComponent,
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        MaterialModule.forRoot(),
    ],
    declarations: [ProfileComponent],
})
export class ProfileModule { }
