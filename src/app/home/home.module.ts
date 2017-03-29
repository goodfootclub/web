import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from 'app/common';

import { HomeComponent } from './home.component';
import { GamesTileComponent } from './games-tile/games-tile.component';
import { ProfileTileComponent } from './profile-tile/profile-tile.component';
import { TeamsTileComponent } from './teams-tile/teams-tile.component';
import { PickupGamesTileComponent } from './pickup-games-tile/pickup-games-tile.component';
import { PlayersTileComponent } from './players-tile/players-tile.component';
import { SubsTileComponent } from './subs-tile/subs-tile.component';
import { ContactusTileComponent } from './contactus-tile/contactus-tile.component';


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
        GamesTileComponent,
        ProfileTileComponent,
        TeamsTileComponent,
        PickupGamesTileComponent,
        PlayersTileComponent,
        SubsTileComponent,
        ContactusTileComponent,
    ],
})
export class HomeModule { }
