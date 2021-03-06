import { Component, OnInit } from '@angular/core';
import { TitleService } from './core/services/title.service';
import { AuthService } from './auth/auth.service';

import { WindowRefService } from './core/services/window.service';
import { StatusService } from './core/services/status.service';
import { AnalyticsService } from './core/services';
import { HistoryService } from './core/services/history.service';
import { environment } from '../environments/environment';
import { gfcVersion } from './app.version';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl'],
})
export class AppComponent implements OnInit {
    menu: any;

    appVersion = gfcVersion;
    isDevelopment = !!environment.development;
    isLoading = false;

    constructor(
        public title: TitleService,
        public windowRef: WindowRefService,
        private status: StatusService,
        private authService: AuthService,
        private analytics: AnalyticsService,
        private historyService: HistoryService,
    ) {
        title.setTitle('Your Games');
    }

    ngOnInit(): void {
        const authenticated = this.authService.isAuthenticated();
        this.windowRef.setFullScreen(!(authenticated as boolean));

        this.status.observeLoading
            .debounceTime(100)
            .subscribe(value => this.isLoading = value);
    }
}
