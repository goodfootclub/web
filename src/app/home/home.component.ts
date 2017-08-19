import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { WindowRefService } from '../common/services/window.service';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.styl'],
})
export class HomeComponent implements OnInit {

    private initialized = false;
    private isAuthenticated = false;

    constructor(
        private authService: AuthService,
        private windowRef: WindowRefService,
    ) {}

    ngOnInit(): void {
        const authenticated = this.authService.isAuthenticated();
        if (authenticated instanceof Observable) {
            (authenticated as Observable<boolean>)
                .subscribe(this.handleResult.bind(this));
        } else {
            this.handleResult(authenticated as boolean);
        }
    }

    handleResult(result: boolean) {
        this.windowRef.setFullScreen(!result);
        this.isAuthenticated = result;
        this.initialized = true;
    };

    showHomePage() {
        return this.initialized && this.isAuthenticated;
    }

    showLandingPage() {
        return this.initialized && !this.isAuthenticated;
    }
}
