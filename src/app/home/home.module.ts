import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from 'app/common';

import { HomeComponent } from './home.component';


const ROUTES: Routes = [{
    path: '', component: HomeComponent,
}];


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
    ],
    declarations: [
        HomeComponent,
    ],
})
export class HomeModule { }
