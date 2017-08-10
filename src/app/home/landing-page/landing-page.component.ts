import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WindowRefService } from '../../common/services/window.service';
import { ProfileService } from '../../profile/profile.service';

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
    loginForm: FormGroup;

    constructor(
        private profileService: ProfileService,
        private formBuilder: FormBuilder,
        private windowRef: WindowRefService,
    ) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: [''],
            password: [''],
        });
    }

    signin() {
        this.signinForm = true;
    }

    loginUsingCredentials() {
        const formValue = this.loginForm.value;
        this.profileService.login(formValue.username, formValue.password)
            .subscribe(() => {
                this.profileService.updateCurrentUser().subscribe(() => {
                    this.handleLogin.next(true);
                });
            });
    }

    useFacebook() {
        this.windowRef.window.location.href =
            '/auth/login/facebook';
    }
}
