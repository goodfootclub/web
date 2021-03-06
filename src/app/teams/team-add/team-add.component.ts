import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HistoryService } from '../../core/services/history.service';
import { TitleService } from '../../core/services/title.service';
import { TeamsService } from '../teams.service';


@Component({
    selector: 'app-team-add',
    styleUrls: ['./team-add.component.styl'],
    templateUrl: './team-add.component.html',
})
export class TeamAddComponent {

    form: FormGroup;

    constructor(
        public teams: TeamsService,
        public formBuilder: FormBuilder,
        private router: Router,
        private historyService: HistoryService,
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

    onCancel() {
        this.historyService.back();
    }

    onSubmit() {
        this.form.disable();
        this.teams.create(this.form.value).subscribe(newTeam => {
            this.historyService.skipCurrent();
            this.router.navigate(['/teams', newTeam.id]);
        });
    }
}
