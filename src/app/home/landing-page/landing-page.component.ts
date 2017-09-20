import { Component, OnInit } from '@angular/core';
import { WindowRefService } from '../../core/services/window.service';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.styl'],
})
export class LandingPageComponent implements OnInit {

    constructor(
        private windowRef: WindowRefService,
    ) {}

    ngOnInit() {}

    useFacebook() {
        this.windowRef.window.location.href =
            '/social/login/facebook';
    }
}
