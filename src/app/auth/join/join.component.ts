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
        }, this.validatePasswords.bind(this));
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

    getDividerColor(field: string) {
        console.log(this.registerForm.controls[field].errors);
        return this.registerForm.controls[field].valid ||
        this.registerForm.controls[field].pristine ?
            'primary' : 'warn'
    }

    private validatePasswords(group: FormGroup) {
        const reg = group.value as RegistrationForm;
        if (reg.password && reg.repeatPassword
            && reg.password !== reg.repeatPassword) {
            return { differentpasswords: true };
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
