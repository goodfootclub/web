import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { CommonModule as NgCommonModule } from '@angular/common';
import { StatusService } from './services/status.service';
import { HttpProvider } from './services/app.http';

import {
    BackButtonComponent,
    MenuButtonComponent,
    PlayerViewComponent,
    TitleComponent,
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
        TitleComponent,
    ],
    providers: [
        StatusService,
        HttpProvider,
    ],
    exports: [
        BackButtonComponent,
        MaterialModule,
        MenuButtonComponent,
        NgCommonModule,
        PlayerViewComponent,
        TextSearchPipe,
        TitleComponent,
    ],
})
export class CommonModule { }
