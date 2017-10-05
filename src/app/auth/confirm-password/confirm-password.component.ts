import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../profile/profile.service';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'app-confirm-password',
    templateUrl: './confirm-password.component.html',
    styleUrls: ['./confirm-password.component.styl'],
})
export class ConfirmPasswordComponent implements OnInit {

    changePasswordForm: FormGroup;
    submitted = false;
    time = 3;
    private uid;
    private token;

    constructor(
        private profileService: ProfileService,
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['uid'] && params['token']) {
                this.uid = params['uid'];
                this.token = params['token'];
            } else {
                this.router.navigate(['/']);
            }
        });
        this.changePasswordForm = this.formBuilder.group({
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(6),
            ])],
            repeatPassword: ['', Validators.compose([
                Validators.required,
                Validators.minLength(6),
            ])],
        }, {
            validator: this.validatePasswords.bind(this),
        });
    }

    getPasswordDividerColor(field: string) {
        return (this.changePasswordForm.controls[field].valid &&
        !this.changePasswordForm.hasError('different_passwords')) ||
        this.changePasswordForm.controls[field].pristine ?
            'primary' : 'warn'
    }

    changePassword() {
        const formValue = this.changePasswordForm.value as ChangePasswordForm;
        this.profileService.changePassword(
            this.uid,
            this.token,
            formValue.password,
        ).subscribe(() => {
            this.submitted = true;
            Observable.timer(1000, 1000)
                .timeInterval()
                .take(3)
                .subscribe(() => {
                    this.time = this.time - 1;
                    if (this.time === 0) {
                        this.router.navigate(['/']);
                    }
                });
        });
    }

    private validatePasswords(group: FormGroup) {
        if (group.controls['password'].valid &&
            group.controls['repeatPassword'].valid) {
            const reg = group.value as ChangePasswordForm;
            if (reg.password && reg.repeatPassword
                && reg.password !== reg.repeatPassword) {
                return { different_passwords: true };
            }
        }
        return {};
    }
}

class ChangePasswordForm {
    password: string;
    repeatPassword: string;
}
