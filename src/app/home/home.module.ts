import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from 'app/common';

import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material/material.module';

import { HomeComponent } from './home.component';
import {
    ProfileTileComponent,
} from './home-page/profile-tile/profile-tile.component';
import {
    TeamsTileComponent,
} from './home-page/teams-tile/teams-tile.component';
import {
    PlayersTileComponent,
} from './home-page/players-tile/players-tile.component';
import { PlayersService } from '../players/players.service';
import { GamesService } from 'app/games/games.service';
import { TeamsService } from '../teams/teams.service';
import {
    ContactusTileComponent,
} from './home-page/contactus-tile/contactus-tile.component';
import {
    MyNextGameTileComponent,
} from './home-page/my-next-game-tile/my-next-game-tile.component';
import {
    MyGamesTileComponent,
} from './home-page/my-games-tile/my-games-tile.component';
import {
    MyTeamsTileComponent,
} from './home-page/my-teams-tile/my-teams-tile.component';
import {
    PickupGamesTileComponent,
} from './home-page/pickup-games-tile/pickup-games-tile.component';
import {
    InvitesTileComponent,
} from './home-page/invites-tile/invites-tile.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomePageComponent } from './home-page/home-page.component';

const ROUTES: Routes = [{
    path: '', component: HomeComponent,
}];


@NgModule({
    imports: [
        CoreModule,
        MaterialModule,
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
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
        LandingPageComponent,
        HomePageComponent,
    ],
    providers: [
        PlayersService,
        GamesService,
        TeamsService,
    ],
})
export class HomeModule { }
