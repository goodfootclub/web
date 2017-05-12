import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from 'app/common';

import { HomeComponent } from './home.component';
import { ProfileTileComponent } from './profile-tile/profile-tile.component';
import { TeamsTileComponent } from './teams-tile/teams-tile.component';
import { PlayersTileComponent } from './players-tile/players-tile.component';
import { PlayersService } from '../players/players.service';
import { GamesService } from 'app/games/games.service';
import {
    ContactusTileComponent,
} from './contactus-tile/contactus-tile.component';
import {
    MyNextGameTileComponent,
} from './my-next-game-tile/my-next-game-tile.component';
import {
    MyGamesTileComponent,
} from './my-games-tile/my-games-tile.component';
import {
    MyTeamsTileComponent,
} from './my-teams-tile/my-teams-tile.component';
import {
    PickupGamesTileComponent,
} from './pickup-games-tile/pickup-games-tile.component';
import { InvitesTileComponent } from './invites-tile/invites-tile.component';


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
        ProfileTileComponent,
        TeamsTileComponent,
        PlayersTileComponent,
        ContactusTileComponent,
        MyNextGameTileComponent,
        MyGamesTileComponent,
        MyTeamsTileComponent,
        PickupGamesTileComponent,
        InvitesTileComponent,
    ],
    providers: [
        PlayersService,
        GamesService,
    ],
})
export class HomeModule { }
