/**
 * Player (user) profile
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';


const ROUTES: Routes = [{
    path: '', component: ProfileComponent,
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
    ],
    declarations: [ProfileComponent],
})
export class ProfileModule { }
