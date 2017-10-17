import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GamesService } from '../games.service';
import { GameEvent, RsvpStatus, Player, RsvpStatuses, User } from '../../types';
import { MdRadioGroup, MdDialogRef, MdDialog } from '@angular/material';
import { TitleService } from '../../core/services/title.service';
import { ProfileService } from '../../profile/profile.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/forkJoin';

@Component({
    selector: 'app-game-details',
    templateUrl: './game-details.component.html',
    styleUrls: ['../games.component.styl', './game-details.component.styl'],
})
export class GameDetailsComponent implements OnInit {

    game: GameEvent;
    gameDate: Date;
    user: User;
    userPlayer: Player;
    rsvpMessages = RsvpStatuses.RSVP_MESSAGES;

    @ViewChild(MdRadioGroup)
    statusRadioBlock: MdRadioGroup;

    constructor(
        private games: GamesService,
        private titleService: TitleService,
        private route: ActivatedRoute,
        private router: Router,
        private profileService: ProfileService,
        private dialogService: MdDialog,
    ) { }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            Observable.forkJoin(
                this.profileService.getCurrentUser(),
                this.games.get(id),
            ).subscribe(arr => {
                this.user = arr[0];
                const game = arr[1] as GameEvent;
                this.titleService.setTitle(game.getName());
                this.userPlayer = game.playersById[
                    this.user.id
                ];
                this.game = game;
                this.gameDate = this.getGameDate(this.game.datetime);
                this.statusRadioBlock.registerOnChange(
                    this.setStatus.bind(this));
                if (this.userPlayer) {
                    this.statusRadioBlock.value = '' + this.userPlayer.rsvp;
                }
            });
        });
    }

    private getGameDate(sdate: string | string[]): Date {
        let s = sdate instanceof Array ? sdate[0] : sdate;
        return new Date(s);
    }

    setStatus(status: RsvpStatus) {
        this.games.setStatus(this.game.id, this.userPlayer, status)
            .subscribe(() => {
            this.games.get(this.game.id).subscribe(game => {
                this.userPlayer = game.playersById[
                    this.user.id
                ];
                this.game = game;
            });
        });
    }

    join() {
        this.games.addPlayer(
            this.game.id,
            this.user,
        ).subscribe(() => {
            this.games.get(this.game.id).subscribe(game => {
                this.userPlayer = game.playersById[
                    this.user.id
                ];
                this.game = game;
                if (this.userPlayer) {
                    this.statusRadioBlock.value = '' + this.userPlayer.rsvp;
                }
            });
        });
    }

    leave() {
        this.games.removePlayer(
            this.game.id,
            this.userPlayer,
        ).subscribe(() => {
            this.games.get(this.game.id).subscribe(game => {
                this.userPlayer = game.playersById[
                    this.user.id
                ];
                this.game = game;
            });
        });
    }

    isAddPlayersVisible(): boolean {
        if (this.game != null && this.game.organizer != null) {
            return this.user.id
                === this.game.organizer.id;
        }
        return false;
    }

    addPlayer() {
        const params: any = { targetGame: this.game.id };
        if (this.game.teams && this.game.teams.length > 0) {
            params.targetTeam = this.game.teams[0].id;
        }
        this.router.navigate(['/players', params]);
    }

    isAvailableToEdit() {
        return this.user && this.game &&
            this.user.id === this.game.organizer.id;
    }

    editGame() {
        this.router.navigate(['/games', this.game.id, 'edit']);
    }
}
