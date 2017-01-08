import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from 'app/common';
import { GamesService } from './games.service';
import { LocationsService } from './locations.service';
import { GamesComponent } from './games.component';
import { GameAddComponent } from './game-add';


const ROUTES: Routes = [{
    path: '', component: GamesComponent,
}, {
    path: 'add', component: GameAddComponent,
}, {
    path: ':id', component: GamesComponent,
}];


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
    ],
    providers: [GamesService, LocationsService],
    declarations: [
        GameAddComponent,
        GamesComponent,
    ],
})
export class GamesModule { }
