import { Component, OnInit } from '@angular/core';
import { TitleService } from './title.service';
import { AnalyticsService } from './common';
import { StatusService } from './common/services/status.service';
import { HistoryService } from './common/services/history.service';
import { AuthService } from './auth/auth.service';
import { WindowRefService } from './common/services/window.service';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl'],
})
export class AppComponent implements OnInit {
    menu: any;

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
            .subscribe(value => this.isLoading = value);
    }
}
