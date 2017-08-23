import { Component, OnInit, Output, EventEmitter } from '@angular/core';

const landingBg = require('./img/bg.jpg');

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.styl'],
})
export class LandingPageComponent implements OnInit {

    @Output('handleLogin')
    handleLogin = new EventEmitter<boolean>();

    bgImg = `url('${ landingBg }')`;
    signinForm = false;
    registerForm = false;

    constructor() {}

    ngOnInit() {}

    signin() {
        this.signinForm = true;
    }

    register() {
        this.registerForm = true;
    }

    handleLoginResult(event) {
        this.handleLogin.next(event);
    }
}
