import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { WindowRefService } from '../core/services/window.service';


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
        this.handleResult(this.authService.isAuthenticated());
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
