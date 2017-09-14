import { Component, OnInit } from '@angular/core';
import { TitleService } from './core/services/title.service';
import { AuthService } from './auth/auth.service';

import { WindowRefService } from './core/services/window.service';
import { StatusService } from './core/services/status.service';
import { AnalyticsService } from './core/services/analytics.service';
import { HistoryService } from './core/services/history.service';

import { Observable } from 'rxjs/Observable';
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
        if (authenticated instanceof Observable) {
            (authenticated as Observable<boolean>)
                .subscribe(result => this.windowRef.setFullScreen(!result));
        } else {
            this.windowRef.setFullScreen(!(authenticated as boolean));
        }

        this.status.observeLoading
            .debounceTime(100)
            .subscribe(value => this.isLoading = value);
    }
}
