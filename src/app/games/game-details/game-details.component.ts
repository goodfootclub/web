import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GamesService } from '../games.service';
import { AuthService } from '../../auth/auth.service';
import { GameEvent, RsvpStatus, Player } from '../../types';


@Component({
    selector: 'app-game-details',
    templateUrl: './game-details.component.html',
    styleUrls: [],
})
export class GameDetailsComponent implements OnInit {

    game: GameEvent;
    editMode = false;
    user: Player;
    rsvpMessages = {
        2: 'In',
        1: 'Maybe',
        0: 'Out',
    };

    constructor(
        private games: GamesService,
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthService,
    ) { }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.games.get(id).subscribe(game => {
                this.user = game.playersById[
                    this.auth.profile.currentUser.id
                ];
                this.game = game;
            });
        });
    }

    setStatus(status: RsvpStatus) {
        this.games.setStatus(this.game, this.user, status).subscribe(() => {
            this.games.get(this.game.id).subscribe(game => {
                this.user = game.playersById[
                    this.auth.profile.currentUser.id
                ];
                this.game = game;
            });
        });
    }

    join() {
        this.games.addPlayer(
            this.game,
            this.auth.profile.currentUser,
        ).subscribe(() => {
            this.games.get(this.game.id).subscribe(game => {
                this.user = game.playersById[
                    this.auth.profile.currentUser.id
                ];
                this.game = game;
            });
        });
    }

    leave() {
        this.games.removePlayer(
            this.game,
            this.user,
        ).subscribe(() => {
            this.games.get(this.game.id).subscribe(game => {
                this.user = game.playersById[
                    this.auth.profile.currentUser.id
                ];
                this.game = game;
            });
        });
    }
}
