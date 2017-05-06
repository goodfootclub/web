import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
    BackButtonComponent,
    LoadMoreComponent,
    MenuButtonComponent,
    HomeButtonComponent,
    PlayerViewComponent,
    TitleComponent,
} from './ui';
import { TextSearchPipe } from './pipes';
import { HttpProvider } from './services/app.http';
import { AppToastyService } from './services/toasty.service';


/**
 * Common UI directives, services, etc...
 */
@NgModule({
    imports: [
        MaterialModule,
        NgCommonModule,
        RouterModule,
    ],
    declarations: [
        BackButtonComponent,
        LoadMoreComponent,
        MenuButtonComponent,
        HomeButtonComponent,
        PlayerViewComponent,
        TextSearchPipe,
        TitleComponent,
    ],
    providers: [
        HttpProvider,
        AppToastyService,
    ],
    exports: [
        BackButtonComponent,
        LoadMoreComponent,
        MaterialModule,
        MenuButtonComponent,
        HomeButtonComponent,
        NgCommonModule,
        PlayerViewComponent,
        TextSearchPipe,
        TitleComponent,
    ],
})
export class CommonModule { }
