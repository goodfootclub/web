import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { CommonModule as NgCommonModule } from '@angular/common';

import {
    BackButtonComponent,
    MenuButtonComponent,
    PlayerViewComponent,
} from './ui';
import { TextSearchPipe } from './pipes';


/**
 * Common UI directives, services, etc...
 */
@NgModule({
    imports: [
        MaterialModule,
        NgCommonModule,
    ],
    declarations: [
        BackButtonComponent,
        MenuButtonComponent,
        PlayerViewComponent,
        TextSearchPipe,
    ],
    exports: [
        BackButtonComponent,
        MaterialModule,
        MenuButtonComponent,
        NgCommonModule,
        PlayerViewComponent,
        TextSearchPipe,
    ],
})
export class CommonModule { }
