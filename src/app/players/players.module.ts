import { CommonModule } from 'app/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PlayersComponent } from './players.component';
import { PlayerDetailsComponent } from './player-details';
import { PlayersService } from './players.service';


const ROUTER_CONFIG = [
    { path: '', component: PlayersComponent },
    { path: ':id', component: PlayerDetailsComponent },
];


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    declarations: [
        PlayersComponent,
        PlayerDetailsComponent,
    ],
    providers: [PlayersService],
})
export class PlayersModule { }
