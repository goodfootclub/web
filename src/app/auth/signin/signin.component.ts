import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../profile/profile.service';
import { WindowRefService } from '../../common/services/window.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.styl'],
})
export class SigninComponent implements OnInit {

    loginForm: FormGroup;

    constructor(
        private profileService: ProfileService,
        private formBuilder: FormBuilder,
        private windowRef: WindowRefService,
        private router: Router,
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
                    this.router.navigate(['/']);
                });
            });
    }

    useFacebook() {
        this.windowRef.window.location.href =
            '/auth/login/facebook';
    }

    back() {
        this.router.navigate(['/']);
    }
}
