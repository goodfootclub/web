import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../profile/profile.service';

@Component({
    selector: 'app-join',
    templateUrl: './join.component.html',
    styleUrls: ['./join.component.styl'],
})
export class JoinComponent implements OnInit {

    registerForm: FormGroup;
    submitted = false;

    constructor(
        private profileService: ProfileService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.email,
            ])],
            username: ['', Validators.required],
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

    register() {
        const registration = this.registerForm.value as RegistrationForm;
        this.profileService.register(
            registration.email,
            registration.username,
            registration.password,
        ).subscribe(() => {
            // TODO do something here
            this.submitted = true;
        });
    }

    back() {
        this.router.navigate(['/']);
    }

    getPasswordDividerColor(field: string) {
        return (this.registerForm.controls[field].valid &&
        !this.registerForm.hasError('different_passwords')) ||
        this.registerForm.controls[field].pristine ?
            'primary' : 'warn'
    }

    private validatePasswords(group: FormGroup) {
        if (group.controls['password'].valid &&
            group.controls['repeatPassword'].valid) {
            const reg = group.value as RegistrationForm;
            if (reg.password && reg.repeatPassword
                && reg.password !== reg.repeatPassword) {
                return { different_passwords: true };
            }
        }
        return {};
    }
}

class RegistrationForm {
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
}
