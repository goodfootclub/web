import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    form: FormGroup;
    team: Team;
    players: Player[] = [];

    isPlayer = false;
    isManager = false;

    constructor(
        public teams: TeamsService,
        public formBuilder: FormBuilder,
        public router: Router,
        public route: ActivatedRoute,
        public title: TitleService,
        public profile: ProfileService,
    ) {
        title.setTitle('Edit a team');
    }

    ngOnInit(): void {
        this.form = this.createForm();
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.teams.get(id).subscribe(team => {
                this.initTeam(team);
            });
        });
    }

    createForm(): FormGroup {
        return this.formBuilder.group({
            info: ['', Validators.maxLength(1000)],
        });
    }

    initTeam(team: Team): void {
        this.title.setTitle(team.name);
        this.team = team;
        this.form.patchValue(team);
        // players list:
        this.players = team.players;
        for (let player of team.players) {
            if (player.id === this.profile.currentUser.id) {
                this.isPlayer = player.role >= PlayerRole.Substitute;
                break;
            }
        }
        for (let manager of team.managers) {
            if (manager.id === this.profile.currentUser.id) {
                this.isManager = true;
                break;
            }
        }
    }

    saveInfo(): void {
        const newValue = this.form.controls['info'].value;
        // TODO post new info
    }
}
