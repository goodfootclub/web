/**
 * Player (user) profile
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppCommonModule } from 'app/common';
import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profile-edit';
import { ProfileDeleteComponent } from './profile-delete';
import { ChangePasswordComponent } from './change-password';
import { MaterialModule } from 'app/material/material.module';


const ROUTES: Routes = [{
    path: '', component: ProfileComponent,
}, {
    path: 'edit', component: ProfileEditComponent,
}, {
    path: 'changepassword', component: ChangePasswordComponent,
}, {
    path: 'delete', component: ProfileDeleteComponent,
}];

@NgModule({
    imports: [
        MaterialModule,
        AppCommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
    ],
    declarations: [
        ProfileComponent,
        ProfileEditComponent,
        ProfileDeleteComponent,
        ChangePasswordComponent,
    ],
})
export class ProfileModule { }
