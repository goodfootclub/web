import { Injectable } from '@angular/core';
import {
    Http,
    Request,
    RequestMethod,
    URLSearchParams,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Team, PlayerRole, Player, GameEvent } from 'app/types';
import { AppToastyService } from '../common/services/toasty.service';


@Injectable()
export class TeamsService {

    constructor(
        private http: Http,
        private toastyService: AppToastyService,
    ) { }


    all(search?: string, limit?: number, offset?: number): Observable<Team[]> {
        const params: URLSearchParams = new URLSearchParams();
        if (limit) { params.set('limit', limit.toString()); }
        if (offset) { params.set('offset', offset.toString()); }
        if (search) { params.set('search', search); }
        return this.http.get('/api/teams/', { search: params })
            .map(res => res.json().results.map(data => new Team(data)))
            .catch((err, caught) => {
                throw err;
            });
    }

    getGames(teamId: number): Observable<GameEvent[]> {
        return this.http.get(`/api/teams/${teamId}/games/`)
            .map(res => res.json().results.map(data => new GameEvent(data)))
            .catch((err, caught) => {
                throw err;
            });
    }

    get(id: number): Observable<Team> {
        return this.http.get(`/api/teams/${id}/`).map(res => {
            return new Team(res.json());
        }).catch((err, caught) => {
            throw err;
        });
    }

    createOrUpdate(data, method: RequestMethod): Observable<Team> {
        const url = method === RequestMethod.Put ?
            `/api/teams/${data.id}` : `/api/teams/`;
        let request = new Request({
            method: method,
            url: url,
            body: data,
        });
        return this.http.request(request).map(res => {
            return new Team(res.json());
        }).catch((err, caught) => {
            throw err;
        });
    }

    create(data): Observable<Team> {
        return this.createOrUpdate(data, RequestMethod.Post).do(() => {
            this.toastyService.success('Team created!');
        });
    }

    update(data): Observable<Team> {
        return this.createOrUpdate(data, RequestMethod.Put).do(() => {
            this.toastyService.success('Team updated!');
        });
    }

    updateTeamPlayer(teamId: number,
                     playerId: number, data): Observable<Player> {
        let request = new Request({
            method: RequestMethod.Put,
            url: `/api/teams/${teamId}/players/${playerId}`,
            body: data,
        });
        return this.http.request(request).do(() => {
            this.toastyService.success('Player updated!');
        }).map(res => new Player(res.json()));
    }

    excludeTeamPlayer(teamId: number, playerId: number): Observable<any> {
        let request = new Request({
            method: RequestMethod.Delete,
            url: `/api/teams/${teamId}/players/${playerId}`,
        });
        return this.http.request(request).do(() => {
            this.toastyService.success('Player excluded!');
        });
    }

    askToJoin(teamId: number, playerId: number): Observable<any> {
        // FIXME: dirty example needs more work @bsko
        let request = new Request({
            method: RequestMethod.Post,
            url: `/api/teams/${teamId}/players/`,
            body: { id: playerId, role: PlayerRole.RequestedToJoin },
        });
        return this.http.request(request).do(() => {
            this.toastyService.success('Join request sent!');
        }).catch((err) => {
            if (err.status === 409) {
                this.toastyService.warning(
            'Do you like this team so much that you want to join it twice?');
            }
            throw err;
        });
    }

    getCurrentUserTeams(limit?: number, offset?: number):
    Observable<{count?: number, results: Team[]}> {
        const params: URLSearchParams = new URLSearchParams();
        if (limit) { params.set('limit', limit.toString()); }
        if (offset) { params.set('offset', offset.toString()); }
        return this.http.get('/api/teams/my/', { search: params })
            .map(res => {
                let data = res.json();
                data.results = data.results.map(item => new Team(item));
                return data;
            });
    }

    getUserManagedTeams(): Observable<{count?: number, results: Team[]}> {
        return this.http.get('/api/teams/managed/')
            .map(res => {
                let data = res.json();
                data.results = data.results.map(item => new Team(item));
                return data;
            });
    }
}

export const playerRoles = {
    [3]: 'Captain',
    [2]: 'Player',
    [1]: 'Substitute',
    [0]: 'Inactive',
    [-1]: 'Invited',
    [-2]: 'Asked to join',
};
