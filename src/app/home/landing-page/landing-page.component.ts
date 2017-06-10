import { Component } from '@angular/core';
import { WindowRefService } from '../../common/services/window.service';

const landingBg = require('./img/bg.jpg');

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.styl'],
})
export class LandingPageComponent {
    bgImg = `url('${ landingBg }')`;
    signinForm = false;

    constructor(
        private windowRef: WindowRefService,
    ) {}

    signin() {
        this.signinForm = true;
    }

    useFacebook() {
        this.windowRef.window.location.href =
            '/auth/login/facebook';
    }
}
