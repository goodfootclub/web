import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistoryService } from '../../core/services/history.service';
import { TitleService } from '../../core/services/title.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.styl'],
})
export class ChangePasswordComponent implements OnInit {

    changePasswordForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private title: TitleService,
                private historyService: HistoryService) { }

    ngOnInit() {
        this.title.setTitle('Change password');
        this.changePasswordForm = this.formBuilder.group({
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

    onSubmit() {
        // TODO
    }

    onCancel() {
        this.historyService.back();
    }

    getPasswordDividerColor(field: string) {
        return (this.changePasswordForm.controls[field].valid &&
        !this.changePasswordForm.hasError('different_passwords')) ||
        this.changePasswordForm.controls[field].pristine ?
            'primary' : 'warn'
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
