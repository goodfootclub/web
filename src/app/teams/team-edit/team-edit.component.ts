import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TitleService } from 'app/title.service';
import { TeamsService, playerRoles } from '../teams.service';
import { Team, Player, PlayerRole } from '../../types';
import { ProfileService } from '../../profile/profile.service';


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

    updatePlayerRole(player: Player, event: any) {
        const role = +event.value;
        if (player.role !== role) {
            player.role = role;
            this.teams.updateTeamPlayer(this.team.id, player.roleId, player)
                .subscribe((result) => {
                    Object.assign(player, result);
                });
        }
    }

    exclude(player: Player): void {
        const index = this.team.players.indexOf(player);
        this.teams.excludeTeamPlayer(this.team.id, player.roleId)
            .subscribe((result) => {
                this.team.players.splice(index, 1);
            });
    }

    save(): void {
        Object.assign(this.team, this.form.value);
        this.updateTeam();
    }

    updateTeam(): void {
        this.teams.update(this.team).subscribe((team) => this.initTeam(team));
    }
}
