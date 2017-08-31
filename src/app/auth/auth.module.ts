import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { JoinComponent } from './join/join.component';
import { LogoutComponent } from './logout/logout.component';
import { SigninComponent } from './signin/signin.component';

const ROUTES: Routes = [{
    path: 'signin', component: SigninComponent,
}, {
    path: 'join', component: JoinComponent,
}, {
    path: 'logout', component: LogoutComponent,
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        ReactiveFormsModule,
        MaterialModule,
    ],
    declarations: [
        JoinComponent,
        LogoutComponent,
        SigninComponent,
    ],
})
export class AuthModule { }
