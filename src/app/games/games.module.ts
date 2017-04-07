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
import { ProfileService } from '../profile/profile.service';


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
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
    ],
    providers: [
        GamesService,
        LocationsService,
        ProfileService,
    ],
    declarations: [
        GameAddComponent,
        GameDetailsComponent,
        GamesComponent,
        MyGamesComponent,
    ],
})
export class GamesModule { }
