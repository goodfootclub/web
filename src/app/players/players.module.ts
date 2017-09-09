import { CommonModule } from 'app/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PlayersComponent } from './players.component';
import { PlayerDetailsComponent } from './player-details';
import { PlayersService } from './players.service';
import { GamesService } from '../games/games.service';
import { TeamsService } from '../teams/teams.service';
import { MaterialModule } from 'app/material/material.module';
import { CoreModule } from '../core/core.module';


const ROUTER_CONFIG = [
    { path: '', component: PlayersComponent },
    { path: ':id', component: PlayerDetailsComponent },
];


@NgModule({
    imports: [
        CoreModule,
        MaterialModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    declarations: [
        PlayersComponent,
        PlayerDetailsComponent,
    ],
    providers: [
        PlayersService,
        GamesService,
        TeamsService,
    ],
})
export class PlayersModule { }
