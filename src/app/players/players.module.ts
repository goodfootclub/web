import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlayersComponent } from './players.component';
import { PlayersService } from './players.service';


const ROUTER_CONFIG = [
    { path: '', component: PlayersComponent },
];


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(ROUTER_CONFIG),
  ],
  declarations: [PlayersComponent],
  providers: [PlayersService],
})
export class PlayersModule { }
