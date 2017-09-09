import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material/material.module';
import {
    LoadMoreComponent,
    PlayerViewComponent,
    BackButtonComponent,
    MenuButtonComponent,
    TitleComponent,
    HomeButtonComponent,
    IconComponent,
    NavigationButtonsComponent,
} from './ui';
import { GameListComponent } from './components';
import { TextSearchPipe } from './pipes';

/**
 * Common UI directives, services, etc...
 */
@NgModule({
    imports: [
        NgCommonModule,
        RouterModule,
        MaterialModule,
    ],
    declarations: [
        LoadMoreComponent,
        PlayerViewComponent,
        TextSearchPipe,
        GameListComponent,
        IconComponent,
        BackButtonComponent,
        MenuButtonComponent,
        TitleComponent,
        HomeButtonComponent,
        NavigationButtonsComponent,
    ],
    exports: [
        LoadMoreComponent,
        NgCommonModule,
        PlayerViewComponent,
        TextSearchPipe,
        GameListComponent,
        IconComponent,
        BackButtonComponent,
        MenuButtonComponent,
        TitleComponent,
        HomeButtonComponent,
        NavigationButtonsComponent,
    ],
})
export class AppCommonModule { }
