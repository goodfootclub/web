import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
    BackButtonComponent,
    LoadMoreComponent,
    MenuButtonComponent,
    PlayerViewComponent,
    TitleComponent,
    HomeButtonComponent,
} from './ui';
import { GameListComponent } from './components';
import { IconComponent } from './components/icon.component';
import { TextSearchPipe } from './pipes';
import { HttpProvider } from './services/app.http';
import { AppToastyService } from './services/toasty.service';
import { NavigationButtonsComponent } from './ui/navigation-buttons.component';


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
        PlayerViewComponent,
        TextSearchPipe,
        TitleComponent,
        GameListComponent,
        IconComponent,
        HomeButtonComponent,
        NavigationButtonsComponent,
    ],
    providers: [
        HttpProvider,
        AppToastyService,
    ],
    exports: [
        LoadMoreComponent,
        MaterialModule,
        MenuButtonComponent,
        NgCommonModule,
        PlayerViewComponent,
        TextSearchPipe,
        TitleComponent,
        GameListComponent,
        IconComponent,
        NavigationButtonsComponent,
    ],
})
export class CommonModule { }
