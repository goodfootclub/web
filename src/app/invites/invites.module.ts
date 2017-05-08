import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from 'app/common';
import { InvitesComponent } from './invites.component';

const ROUTER_CONFIG = [
    { path: '', component: InvitesComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTER_CONFIG),
        CommonModule,
    ],
    declarations: [InvitesComponent],
})
export class InvitesModule {}
