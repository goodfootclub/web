import { Component, OnInit } from '@angular/core';
import { WindowRefService } from '../../core/services/window.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.styl'],
})
export class LandingPageComponent implements OnInit {

    constructor(
        private windowRef: WindowRefService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit() {}

    useCredentials() {
        this.router.navigate(['/auth', 'signin'],
            { queryParams: this.activatedRoute.snapshot.queryParams });
    }

    useFacebook() {
        const next = this.activatedRoute.snapshot.queryParams.redirect_url;
        this.windowRef.window.location.href =
            `/social/login/facebook${next ? '?next=' + next : ''}`;
    }
}
