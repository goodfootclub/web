import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from 'app/common';
import { GamesService } from './games.service';
import { LocationsService } from './locations.service';
import { GamesComponent } from './games.component';
import { GameAddComponent } from './game-add';
import { GameDetailsComponent } from './game-details';
import { MyGamesComponent } from './my-games/my-games.component';
import { MaterialModule } from 'app/material/material.module';
import { CoreModule } from '../core/core.module';


const ROUTES: Routes = [{
    path: '', component: GamesComponent,
}, {
    path: 'my', component: MyGamesComponent,
}, {
    path: 'add', component: GameAddComponent,
}, {
    path: ':id', component: GameDetailsComponent,
}];


@NgModule({
    imports: [
        CoreModule,
        MaterialModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
    ],
    providers: [
        GamesService,
        LocationsService,
    ],
    declarations: [
        GameAddComponent,
        GameDetailsComponent,
        GamesComponent,
        MyGamesComponent,
    ],
})
export class GamesModule { }
