import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { TitleService } from 'app/title.service';
import { PlayersService } from '../players.service';
import { User } from 'app/types';


@Component({
    selector: 'app-player-details',
    templateUrl: './player-details.component.html',
})
export class PlayerDetailsComponent implements OnInit {

    player: User;
    targetTeam: number;
    targetGame: number;

    constructor(
        public players: PlayersService,
        public route: ActivatedRoute,
        public router: Router,
        public title: TitleService,
    ) {
        title.setTitle('Player ');
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.targetTeam = +params['targetTeam'];
            this.targetGame = +params['targetGame'];
            this.players.get(id).subscribe(player => {
                this.player = player;
            });
        });
    }

    isInviteVisible(): boolean {
        return !!(this.targetGame || this.targetTeam);
    }

    invite() {
        if (this.targetGame) {
            const teamMember = this.targetTeam ? 0 : 2;
            this.players.inviteToGame(this.targetGame,
                this.player.id,
                teamMember).subscribe(
                    this.navigate.call(this, '/games', this.targetGame));
        } else if (this.targetTeam) {
            this.players.inviteToTeam(this.targetTeam, this.player.id)
                .subscribe(this.navigate.call(this, '/teams', this.targetTeam));
        }
    }

    navigate(category: string, id: string) {
        this.router.navigate([category, id]);
    }
}
