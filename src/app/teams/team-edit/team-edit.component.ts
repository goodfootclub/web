import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { TitleService } from 'app/title.service';
import { TeamsService, playerRoles } from '../teams.service';
import { Team, Player, PlayerRole } from '../../types';
import { ProfileService } from '../../profile/profile.service';
import { EditRoleComponent } from './edit-role-popup/edit-role.component';


@Component({
    selector: 'app-team-edit',
    styleUrls: ['./team-edit.component.styl'],
    templateUrl: './team-edit.component.html',
})
export class TeamEditComponent implements OnInit {

    ROLES = playerRoles;
    roasterRoles = [];
    form: FormGroup;
    roaster: FormGroup;
    team: Team;

    isPlayer = false;
    isManager = false;

    sourceTeam = {
        info: '',
        type: 2,
    };

    constructor(
        public teams: TeamsService,
        public formBuilder: FormBuilder,
        public router: Router,
        public route: ActivatedRoute,
        public title: TitleService,
        public profile: ProfileService,
        private dialogService: MdDialog,
    ) {
        title.setTitle('Edit a team');
        this.roasterRoles = Object.keys(this.ROLES).filter((key) => +key >= 0);
    }

    ngOnInit(): void {
        this.form = this.createForm();
        this.roaster = this.createRoasterForm();
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.teams.get(id).subscribe(team => this.initTeam(team));
        });
    }

    createForm(): FormGroup {
        return this.formBuilder.group({
            info: ['', Validators.maxLength(1000)],
            type: ['2', Validators.required],
        });
    }

    createRoasterForm(): FormGroup {
        return this.formBuilder.group({
            players: this.formBuilder.array([]),
        });
    }

    initTeam(team: Team): void {
        this.title.setTitle(team.name);
        this.team = team;
        this.sourceTeam = { info: team.info, type: team.type };
        this.form.patchValue(team);
        const control = <FormArray>this.roaster.controls['players'];
        team.players.forEach((player) => {
            control.push(
                this.formBuilder.group({ role: [player.role.toString()] }));
        });
        // players list:
        this.isPlayer = !!team.players.find(
            (player) => player.id === this.profile.currentUser.id
            && player.role >= PlayerRole.Substitute);
        this.isManager = !!team.managers.find(
            (manager) => manager.id === this.profile.currentUser.id);
    }

    openDialog(player: Player) {
        const dialog: MdDialogRef<EditRoleComponent> =
            this.dialogService.open(EditRoleComponent, {
                height: '300px',
                width: '250px',
            });
        dialog.componentInstance.setPlayer(player);
        dialog.componentInstance.setTeam(this.team);
    }

    save(): void {
        Object.assign(this.team, this.form.value);
        this.updateTeam();
    }

    updateTeam(): void {
        this.teams.update(this.team).subscribe((team) => this.initTeam(team));
    }
}
