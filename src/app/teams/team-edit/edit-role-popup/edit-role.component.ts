import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialogRef } from '@angular/material';
import { playerRoles, TeamsService } from '../../teams.service';
import { Player, Team } from '../../../types';

class PlayerRole {
    id: number;
    name: string;
}

@Component({
    selector: 'app-edit-role',
    styleUrls: ['./edit-role.component.styl'],
    templateUrl: './edit-role.component.html',
})
export class EditRoleComponent implements OnInit {

    ROLES = playerRoles;
    playerRolesList = this.getPlayerRolesList();
    player: Player;
    team: Team;

    constructor(
        private router: Router,
        private teamsService: TeamsService,
        private dialogRef: MdDialogRef<EditRoleComponent>,
    ) {}

    ngOnInit(): void {}

    redirectToPlayerInfo(): void {
        this.router.navigate(['/players', this.player.id]);
        this.dialogRef.close();
    }

    updatePlayerRole(event: any) {
        const roleId = +event.value;
        const oldRoleId = this.player.role;
        if (this.player.role !== roleId) {
            if (roleId > -3) {
                this.player.role = roleId;
                this.teamsService
                    .updateTeamPlayer(this.team.id, this.player.id, this.player)
                    .subscribe((result) => {
                        Object.assign(this.player, result);
                    }, this.handleException(oldRoleId));
            } else {
                const index = this.team.players.indexOf(this.player);
                this.teamsService
                    .excludeTeamPlayer(this.team.id, this.player.id)
                    .subscribe(() => {
                        this.team.players.splice(index, 1);
                    });
            }
        }
        this.dialogRef.close();
    }

    handleException(oldRoleId: number) {
        return () => {
            this.player.role = oldRoleId;
        };
    }

    getPlayerRolesList(): PlayerRole[] {
        if (this.ROLES) {
            return Object.keys(this.ROLES).map((key) => {
                return {
                    id: (+key),
                    name: (this.ROLES[key] as string),
                } as PlayerRole;
            })
                .filter( a => a.id >= 0 )
                .concat([{ id: -3, name: 'Exclude' } as PlayerRole])
                .sort((a, b) => b.id - a.id);
        }
        return [];
    }

    isRoleChecked(role: PlayerRole): boolean {
        return this.player.role === role.id;
    }

    setPlayer(player: Player) {
        this.player = player;
    }

    setTeam(team: Team) {
        this.team = team;
    }
}
