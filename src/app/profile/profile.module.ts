/**
 * Player (user) profile
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profile.edit.component';


const ROUTES: Routes = [{
    path: '', component: ProfileComponent,
}, {
    path: 'edit', component: ProfileEditComponent,
}];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule.forRoot(),
        RouterModule.forChild(ROUTES),
    ],
    declarations: [ProfileComponent, ProfileEditComponent],
})
export class ProfileModule { }
