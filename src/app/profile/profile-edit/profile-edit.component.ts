import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProfileService } from '../profile.service';
import { User } from 'app/types';
import { TitleService } from '../../core/services/title.service';
import { HistoryService } from '../../core/services/history.service';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.styl'],
})
export class ProfileEditComponent implements OnInit {

    user: User;
    profileForm: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
        public profile: ProfileService,
        private historyService: HistoryService,
        private router: Router,
        private title: TitleService,
    ) {
        profile.getCurrentUser().subscribe(user => {
            this.user = user;
            if (this.profileForm) {
                this.profileForm.patchValue(user);
            }
        });
    }

    onCancel() {
        this.historyService.back();
    }

    onSubmit() {
        this.profileForm.disable();
        this.profile.update(this.profileForm.value).subscribe(() => {
            this.router.navigate(['/profile']);
        });
    }

    ngOnInit() {
        this.title.setTitle('Profile');
        this.profileForm = this.formBuilder.group({
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
        });

        this.profileForm.patchValue(this.user);
    }
}
