import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GamesService } from '../games.service';
import { AuthService } from '../../auth/auth.service';
import { GameEvent, RsvpStatus, Player } from '../../types';
import { MdRadioGroup } from '@angular/material';
import { TitleService } from '../../title.service';


@Component({
    selector: 'app-game-details',
    templateUrl: './game-details.component.html',
    styleUrls: ['../games.component.styl', './game-details.component.styl'],
})
export class GameDetailsComponent implements OnInit {

    game: GameEvent;
    user: Player;
    rsvpMessages = {
        '2': 'In',
        '1': 'Maybe',
        '0': 'Out',
        '-1': 'Invited',
        '-2': 'Asked to join',
    };

    @ViewChild(MdRadioGroup)
    statusRadioBlock: MdRadioGroup;

    constructor(
        private games: GamesService,
        private titleService: TitleService,
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthService,
    ) { }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.games.get(id).subscribe(game => {
                this.titleService.setTitle(game.name);
                this.user = game.playersById[
                    this.auth.profile.currentUser.id
                ];
                this.game = game;
                this.statusRadioBlock.registerOnChange(
                    this.setStatus.bind(this));
                if (this.user) {
                    this.statusRadioBlock.value = '' + this.user.rsvp;
                }
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
                if (this.user) {
                    this.statusRadioBlock.value = '' + this.user.rsvp;
                }
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
