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
    editPassword = false;

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

    getPasswordDividerColor(field: string) {
        console.log(this.profileForm.hasError('different_passwords'));
        return (this.profileForm.controls[field].valid &&
        !this.profileForm.hasError('different_passwords')) ||
        this.profileForm.controls[field].pristine ?
            'primary' : 'warn'
    }

    changePassword() {
        this.editPassword = !this.editPassword;
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

        this.profileForm.patchValue(this.user);
    }

    private validatePasswords(group: FormGroup) {
        if (group.controls['password'].valid &&
            group.controls['repeatPassword'].valid) {
            const reg = group.value;
            if (reg.password && reg.repeatPassword
                && reg.password !== reg.repeatPassword) {
                return { different_passwords: true };
            }
        }
        return {};
    }
}
