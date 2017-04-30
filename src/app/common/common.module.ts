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
import { GameListComponent } from './components';
import { TextSearchPipe } from './pipes';
import { HttpProvider } from './services/app.http';
import { AppToastyService } from './services/toasty.service';
import { RouterModule } from '@angular/router';


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
        NgCommonModule,
        PlayerViewComponent,
        TextSearchPipe,
        TitleComponent,
        GameListComponent,
    ],
})
export class CommonModule { }
