import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../profile/profile.service';

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
        private router: Router,
        private activatedRoute: ActivatedRoute,
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
                const next =
                    this.activatedRoute.snapshot.queryParams.redirect_url;
                if (next) {
                    this.router.navigateByUrl(next);
                } else {
                    this.router.navigate(['/']);
                }
            });
        });
    }

    forgotPassword() {
        this.router.navigate(['/auth/reset']);
    }

    back() {
        this.router.navigate(['/']);
    }
}
