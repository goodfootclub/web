import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { User } from 'app/types';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile.edit.component.html',
    styleUrls: ['./profile.component.styl'],
})
export class ProfileEditComponent implements OnInit {

    user: User;
    form: FormGroup;

    constructor(
        public profile: ProfileService,
        public formBuilder: FormBuilder,
    ) {
        profile.getCurrentUser().subscribe(user => {
            this.user = user;
            if (this.form) {
                this.form.patchValue(user);
            }
        });
    }

    onSubmit() {
        console.log(this.form);
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
        });

        this.form.patchValue(this.user);
    }
}
