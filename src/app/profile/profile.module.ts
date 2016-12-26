/**
 * Player (user) profile
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { CommonModule } from 'app/common';
import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profile-edit';


const ROUTES: Routes = [{
    path: '', component: ProfileComponent,
}, {
    path: 'edit', component: ProfileEditComponent,
}];

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
    ],
    declarations: [
        ProfileComponent,
        ProfileEditComponent,
    ],
})
export class ProfileModule { }
