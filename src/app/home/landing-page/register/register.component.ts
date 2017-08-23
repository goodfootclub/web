import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../profile/profile.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.styl',
        './../landing-page.component.styl'],
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    submitted = false;

    constructor(
        private profileService: ProfileService,
        private formBuilder: FormBuilder,
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
