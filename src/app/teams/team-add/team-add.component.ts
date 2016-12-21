import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TeamsService } from '../teams.service';


@Component({
    selector: 'app-team-add',
    template: 'Add your team man!',
})
export class TeamAddComponent {

    form: FormGroup;

    constructor(
        public teams: TeamsService,
        public formBuilder: FormBuilder,
    ) {
        this.form = this.formBuilder.group({
            name: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(30),
            ])],
            info: ['', Validators.maxLength(255)],
        });
    }

    onSubmit() {
        console.log(this.form);
    }
}
