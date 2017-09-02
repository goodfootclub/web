import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { JoinComponent } from './join/join.component';
import { LogoutComponent } from './logout/logout.component';
import { SigninComponent } from './signin/signin.component';
import { CommonModule as CustomCommonModule } from '../common/common.module';
import { ActivateComponent } from './activate/activate.component';

const ROUTES: Routes = [{
    path: 'signin', component: SigninComponent,
}, {
    path: 'join', component: JoinComponent,
}, {
    path: 'logout', component: LogoutComponent,
}, {
    path: 'activate', component: ActivateComponent,
}];

@NgModule({
    imports: [
        CommonModule,
        CustomCommonModule,
        RouterModule.forChild(ROUTES),
        ReactiveFormsModule,
        MaterialModule,
    ],
    declarations: [
        JoinComponent,
        LogoutComponent,
        SigninComponent,
        ActivateComponent,
    ],
})
export class AuthModule { }
