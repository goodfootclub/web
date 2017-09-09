/**
 * Player (user) profile
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from 'app/common';
import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profile-edit';
import {
    ProfileDeleteComponent,
} from './profile-delete/profile-delete.component';
import { MaterialModule } from 'app/material/material.module';
import { CoreModule } from '../core/core.module';


const ROUTES: Routes = [{
    path: '', component: ProfileComponent,
}, {
    path: 'edit', component: ProfileEditComponent,
}, {
    path: 'delete', component: ProfileDeleteComponent,
}];

@NgModule({
    imports: [
        CoreModule,
        MaterialModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
    ],
    declarations: [
        ProfileComponent,
        ProfileEditComponent,
        ProfileDeleteComponent,
    ],
})
export class ProfileModule { }
