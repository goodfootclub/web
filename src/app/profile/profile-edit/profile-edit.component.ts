import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProfileService } from '../profile.service';
import { User } from 'app/types';


@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.styl'],
})
export class ProfileEditComponent implements OnInit {

    user: User;
    form: FormGroup;
    isPosting = false;

    constructor(
        public formBuilder: FormBuilder,
        public profile: ProfileService,
        public router: Router,
    ) {
        profile.getCurrentUser().subscribe(user => {
            this.user = user;
            if (this.form) {
                this.form.patchValue(user);
            }
        });
    }

    onSubmit() {
        this.isPosting = true;
        this.form.disable();
        this.profile.update(this.form.value).subscribe(() => {
            this.router.navigate(['/profile']);
        });
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(30),
            ])],
            lastName: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(30),
            ])],
            bio: ['', Validators.maxLength(1000)],

            // Birthday
            birthday: null,

            // gender: null,
            // cover: null,
            // img: null,
            // phone: ['', Validators.maxLength(12)],
        });

        this.form.patchValue(this.user);
    }
}
