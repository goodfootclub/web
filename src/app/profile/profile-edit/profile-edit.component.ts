import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HistoryService } from '../../common/services/history.service';
import { ProfileService } from '../profile.service';
import { User } from 'app/types';
import { TitleService } from '../../title.service';


@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.styl'],
})
export class ProfileEditComponent implements OnInit {

    user: User;
    form: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
        public profile: ProfileService,
        private historyService: HistoryService,
        private router: Router,
        private title: TitleService,
    ) {
        profile.getCurrentUser().subscribe(user => {
            this.user = user;
            if (this.form) {
                this.form.patchValue(user);
            }
        });
    }

    onCancel() {
        this.historyService.back();
    }

    onSubmit() {
        this.form.disable();
        this.profile.update(this.form.value).subscribe(() => {
            this.router.navigate(['/profile']);
        });
    }

    ngOnInit() {
        this.title.setTitle('Profile');
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
