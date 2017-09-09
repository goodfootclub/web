import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { TeamsService } from '../teams/teams.service';
import { GamesService } from '../games/games.service';

import { TitleService } from '../core/services/title.service';
import { PlayersService } from './players.service';
import { User } from '../types';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.styl'],
})
export class PlayersComponent implements OnInit {

    get limit(): number { return 50; };
    get searchDebounceTime(): number { return 750; };
    canLoadMore = true;

    form: FormGroup;
    search: AbstractControl;

    players: User[];
    targetTeam: number;
    targetTeamPlayersList: any;
    targetGame: number;
    targetGamePlayersList: any;

    constructor(
        private playersService: PlayersService,
        private gamesService: GamesService,
        private teamsService: TeamsService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public title: TitleService,
    ) {
        title.setTitle('Players');
    }

    ngOnInit() {
        this.form = this.formBuilder.group({ 'search': [''] });
        this.search = this.form.controls['search'];
        this.search.valueChanges.debounceTime(this.searchDebounceTime)
            .subscribe((value) => {
                this.loadData(value).subscribe(players => {
                    this.players = players;
                    this.canLoadMore = players.length === this.limit;
                });
            });

        this.route.params.forEach((params: Params) => {
            this.targetTeam = +params['targetTeam'];
            this.targetGame = +params['targetGame'];
            if (this.targetTeam) {
                this.reloadTeamPlayers();
            } else if (this.targetGame) {
                this.reloadGamePlayers();
            }
        });

        this.loadData().subscribe(players => {
            this.players = players;
            this.canLoadMore = players.length === this.limit;
        });
    }

    loadMore() {
        this.loadData(this.search.value, this.players.length)
            .subscribe(players => {
            this.players = this.players.concat(players);
            this.canLoadMore = players.length === this.limit;
        });
    }

    loadData(search?: string, offset?: number): Observable<User[]> {
        return this.playersService.all(
            search ? search : '', this.limit, offset);
    }

    openDetails(player: User) {
        const params: any = {};
        const link: any = ['/players', player.id, params];
        if (this.targetTeam) { params.targetTeam = this.targetTeam; }
        if (this.targetGame) { params.targetGame = this.targetGame; }
        this.router.navigate(link);
    }

    invitePlayer(event: Event, player: User) {
        event.stopPropagation();
        if (this.targetGame) {
            const teamMember = this.targetTeam ? 0 : 2;
            this.playersService.inviteToGame(this.targetGame,
                player.id,
                teamMember).subscribe(this.reloadGamePlayers.bind(this));
        } else if (this.targetTeam) {
            this.playersService.inviteToTeam(this.targetTeam, player.id)
                .subscribe(this.reloadTeamPlayers.bind(this));
        }
    }

    isInviteVisible(player: User): boolean {
        if (this.targetTeam && this.targetTeamPlayersList) {
            return !this.targetTeamPlayersList.find(id => id === player.id);
        } else if (this.targetGame && this.targetGamePlayersList) {
            return !this.targetGamePlayersList.find(id => id === player.id);
        }
        return false;
    }

    private reloadGamePlayers() {
        this.gamesService.get(this.targetGame).subscribe(data => {
            this.targetGamePlayersList = data.players.map(pl => pl.id);
        });
    }

    private reloadTeamPlayers() {
        this.teamsService.get(this.targetTeam).subscribe(data => {
            this.targetTeamPlayersList = data.players.map(pl => pl.id);
        });
    }
}
