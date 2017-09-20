import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../profile/profile.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.styl'],
})
export class ResetPasswordComponent implements OnInit {

    resetForm: FormGroup;
    submitted = true;

    constructor(
        private formBuilder: FormBuilder,
        private profileService: ProfileService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.resetForm = this.formBuilder.group({
            email: ['', Validators.compose([
                Validators.email, Validators.required,
            ])],
        });
    }

    reset() {
        this.profileService.resetPassword(this.resetForm.value.email)
            .subscribe(result => {
                this.submitted = true;
            });
    }

    back() {
        this.router.navigate(['/']);
    }
}
