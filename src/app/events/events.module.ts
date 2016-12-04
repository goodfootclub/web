/**
 * Events - entities for each specific game. Each describes time and
 * place when and where it should happen, as well as some optional stuff
 * Note: when the name clashes with some existing Event/event in a
 * namespace, GameEvent is used instead
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EventsComponent } from './events.component';
import { EventDetailsComponent } from './event-details';
import { EventsService } from './events.service';


const ROUTER_CONFIG = [
    { path: '', component: EventsComponent },
    { path: 'events', component: EventsComponent },
    { path: 'events/:id', component: EventDetailsComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    providers: [EventsService],
    declarations: [EventsComponent, EventDetailsComponent],
})
export class EventsModule { }
