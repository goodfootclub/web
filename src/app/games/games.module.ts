import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from 'app/common';
import { GamesService } from './games.service';
import { LocationsService } from './locations.service';
import { GamesComponent } from './games.component';
import { GameAddComponent } from './game-add';
import { GameDetailsComponent } from './game-details';
import { MyGamesComponent } from './my-games/my-games.component';
import { GameEditPopupComponent } from './game-details/game-edit-popup/game-edit-popup.component';

import { MaterialModule } from 'app/material/material.module';

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
        GameAddComponent,
        GameDetailsComponent,
        GamesComponent,
        MyGamesComponent,
        GameEditPopupComponent,
    ],
    entryComponents: [
        GameEditPopupComponent,
    ],
})
export class GamesModule { }
