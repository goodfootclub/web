import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from '../../../profile/profile.service';
import { WindowRefService } from '../../../common/services/window.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.styl', './../landing-page.component.styl'],
})
export class LoginComponent implements OnInit {

    @Output('handleLogin')
    handleLogin = new EventEmitter<boolean>();

    loginForm: FormGroup;

    constructor(
        private profileService: ProfileService,
        private formBuilder: FormBuilder,
        private windowRef: WindowRefService,
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: [''],
            password: [''],
        });
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
