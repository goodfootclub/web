import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
            email: [''],
            username: [''],
            password: [''],
            repeatPassword: [''],
        });
    }

    register() {
        const registration = this.registerForm.value;
        this.profileService.register(
            registration.email,
            registration.username,
            registration.password,
        ).subscribe(() => {
            // TODO do something here
            this.submitted = true;
        });
    }
}
