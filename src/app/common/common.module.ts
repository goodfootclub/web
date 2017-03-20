import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { CommonModule as NgCommonModule } from '@angular/common';

import {
    BackButtonComponent,
    LoadMoreComponent,
    MenuButtonComponent,
    PlayerViewComponent,
    TitleComponent,
} from './ui';
import { TextSearchPipe } from './pipes';
import { HttpProvider } from './services/app.http';


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
        LoadMoreComponent,
        MenuButtonComponent,
        PlayerViewComponent,
        TextSearchPipe,
        TitleComponent,
    ],
    providers: [
        HttpProvider,
    ],
    exports: [
        BackButtonComponent,
        LoadMoreComponent,
        MaterialModule,
        MenuButtonComponent,
        NgCommonModule,
        PlayerViewComponent,
        TextSearchPipe,
        TitleComponent,
    ],
})
export class CommonModule { }
