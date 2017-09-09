import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpProvider } from './services/app.http';
import { AppToastyService } from './services/toasty.service';
import { StatusService } from './services/status.service';
import { HistoryService } from './services/history.service';
import { MenuService } from './services/menu.service';
import { AnalyticsService } from './services/analytics.service';
import { WindowRefService } from './services/window.service';
import { TitleService } from './services/title.service';
import { MaterialModule } from '../material/material.module';

import {
    BackButtonComponent,
    MenuButtonComponent,
    TitleComponent,
    HomeButtonComponent,
    IconComponent,
    NavigationButtonsComponent,
} from './ui';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        HttpModule,
        RouterModule,
    ],
    providers: [
        HttpProvider,
        AppToastyService,
        HttpProvider,
        StatusService,
        MenuService,
        HistoryService,
        AnalyticsService,
        WindowRefService,
        TitleService,
    ],
    declarations: [
        IconComponent,
        BackButtonComponent,
        MenuButtonComponent,
        TitleComponent,
        HomeButtonComponent,
        NavigationButtonsComponent,
    ],
    exports: [
        IconComponent,
        BackButtonComponent,
        MenuButtonComponent,
        TitleComponent,
        HomeButtonComponent,
        NavigationButtonsComponent,
    ],
})
export class CoreModule {
}
