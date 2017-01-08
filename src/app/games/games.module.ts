import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from 'app/common';
import { GamesService } from './games.service';
import { GamesComponent } from './games.component';


const ROUTES: Routes = [{
    path: '', component: GamesComponent,
}, {
    path: 'add', component: GamesComponent,
}, {
    path: ':id', component: GamesComponent,
}];


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
    ],
    providers: [GamesService],
    declarations: [
        GamesComponent,
    ],
})
export class GamesModule { }
