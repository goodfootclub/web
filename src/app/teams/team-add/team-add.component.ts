import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TitleService } from 'app/title.service';
import { TeamsService } from '../teams.service';


@Component({
    selector: 'app-team-add',
    styleUrls: ['./team-add.component.styl'],
    templateUrl: './team-add.component.html',
})
export class TeamAddComponent {

    form: FormGroup;
    isPosting = false;

    constructor(
        public teams: TeamsService,
        public formBuilder: FormBuilder,
        public router: Router,
        title: TitleService,
    ) {
        title.setTitle('Create a team');
        this.form = this.formBuilder.group({
            name: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(30),
            ])],
            info: ['', Validators.maxLength(1000)],
            type: ['2', Validators.required],
        });
    }

    onSubmit() {
        this.isPosting = true;
        this.form.disable();
        this.teams.create(this.form.value).subscribe(newTeam => {
            this.router.navigate(['/teams', newTeam.id]);
        });
    }
}
