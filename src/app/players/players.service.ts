import { Injectable } from '@angular/core';
import {
    Http,
    Request,
    RequestMethod,
    URLSearchParams,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { User, PlayerRole } from 'app/types';
import { AppToastyService } from '../common/services/toasty.service';


@Injectable()
export class PlayersService {

    constructor(
        private http: Http,
        private toastyService: AppToastyService,
    ) { }

    all(search?: string, limit?: number, offset?: number): Observable<User[]> {
        const params: URLSearchParams = new URLSearchParams();
        if (limit) { params.set('limit', limit.toString()); }
        if (offset) { params.set('offset', offset.toString()); }
        if (search) { params.set('search', search); }
        return this.http.get('/api/users/players/', { search: params })
            .map(res => res.json().results.map(data => new User(data)))
            .catch((err, caught) => {
                throw err;
            });
    }

    get(id: number): Observable<User> {
        return this.http.get(`/api/users/players/${id}/`).map(res => {
            return new User(res.json());
        }).catch((err, caught) => {
            throw err;
        });
    }

    inviteToTeam(teamId: number, playerId: number): Observable<any> {
        let request = new Request({
            method: RequestMethod.Post,
            url: `/api/teams/${teamId}/players/`,
            body: { id: playerId, role: PlayerRole.Invited },
        });
        return this.http.request(request).do(() => {
            this.toastyService.success('Player invited!');
        }).catch((err) => {
            if (err.status === 409) {
                this.toastyService.warning(
                'Why u trying to add a player twice?');
            }
            throw err;
        });
    }

    inviteToGame(
        gameId: number,
        playerId: number,
        teamId?: number,
    ): Observable<any> {
        return this.http.post(
            `/api/games/${gameId}/players/`,
            { id: playerId, rsvp: PlayerRole.Invited, team: teamId },
        ).catch((err) => {
            if (err.status === 409) {
                this.toastyService.warning(
                'Hold on Mr. Thorough Pants, they already got a game invite.');
            }
            throw err;
        });
    }
}
