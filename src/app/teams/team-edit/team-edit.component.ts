import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TitleService } from 'app/title.service';
import { TeamsService, playerRoles } from '../teams.service';
import { Team, Player } from '../../types';


@Component({
    selector: 'app-team-edit',
    styleUrls: ['./team-edit.component.styl'],
    templateUrl: './team-edit.component.html',
})
export class TeamEditComponent implements OnInit {

    ROLES = playerRoles;
    form: FormGroup;
    isPosting = false;
    team: Team;
    players: Player[] = [];
    applicants: Player[] = [];

    isEdit = false;
    fieldToUpdate: string = null;

    constructor(
        public teams: TeamsService,
        public formBuilder: FormBuilder,
        public router: Router,
        public route: ActivatedRoute,
        public title: TitleService,
    ) {
        title.setTitle('Edit a team');
    }

    ngOnInit(): void {
        this.form = this.createForm();
        this.form.disable();
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.teams.get(id).subscribe(team => {
                this.initTeam(team);
            });
        });
    }

    createForm(): FormGroup {
        return this.formBuilder.group({
            name: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(30),
            ])],
            info: ['', Validators.maxLength(1000)],
        });
    }

    initTeam(team: Team): void {
        this.title.setTitle(team.name);
        this.team = team;
        this.form.patchValue(team);
        // players list:
        this.players = team.players;
    }

    editField(fieldName: string): void {
        this.isEdit = true;
        this.fieldToUpdate = fieldName;
        this.form.controls[fieldName].enable();
    }

    saveField(fieldName: string): void {
        const newValue = this.form.controls[fieldName].value;
        this.isEdit = false;
        this.fieldToUpdate = null;
        this.form.controls[fieldName].disable();
    }

    isEditVisible(fieldName: string): boolean {
        return !this.isEdit;
    }

    isSaveVisible(fieldName: string): boolean {
        return this.isEdit && this.fieldToUpdate === fieldName;
    }

    onSubmit(): void {
        // TODO handle submit
    }
}
