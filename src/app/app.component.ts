import { Component } from '@angular/core';
import { TitleService } from './title.service';
import { AnalyticsService } from './common';
import { StatusService } from './common/services/status.service';
import { HistoryService } from './common/services/history.service';
import { WindowRefService } from './common/services/window.service';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl'],
})
export class AppComponent {
    menu: any;

    isDevelopment = !!environment.development;

    constructor(
        public title: TitleService,
        public status: StatusService,
        public windowRef: WindowRefService,
        private analytics: AnalyticsService,
        private historyService: HistoryService,
    ) {
        title.setTitle('Your Games');
    }
}
