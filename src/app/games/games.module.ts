import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from 'app/common';
import { GamesService } from './games.service';
import { LocationsService } from './locations.service';
import { GamesComponent } from './games.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { GameDetailsComponent } from './game-details';
import { MyGamesComponent } from './my-games/my-games.component';

import { MaterialModule } from 'app/material/material.module';

const ROUTES: Routes = [{
    path: '', component: GamesComponent,
}, {
    path: 'my', component: MyGamesComponent,
}, {
    path: 'add', component: GameEditComponent,
}, {
    path: ':id', component: GameDetailsComponent,
}, {
    path: ':id/edit', component: GameEditComponent,
}];


@NgModule({
    imports: [
        MaterialModule,
        AppCommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
    ],
    providers: [
        GamesService,
        LocationsService,
    ],
    declarations: [
        GameEditComponent,
        GameDetailsComponent,
        GamesComponent,
        MyGamesComponent,
    ],
})
export class GamesModule { }
