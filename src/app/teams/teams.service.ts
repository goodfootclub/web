import { Injectable } from '@angular/core';
import {
    Http,
    Request,
    CookieXSRFStrategy,
    RequestMethod,
    URLSearchParams,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Team, PlayerRole } from 'app/types';
import { HealthService } from 'app/error-handling';


@Injectable()
export class TeamsService {

    constructor(
        private http: Http,
        private health: HealthService,
    ) { }


    all(search?: string, limit?: number, offset?: number): Observable<Team[]> {
        const params: URLSearchParams = new URLSearchParams();
        if (limit) { params.set('limit', limit.toString()); }
        if (offset) { params.set('offset', offset.toString()); }
        if (search) { params.set('search', search); }
        return this.http.get('/api/teams/', { search: params })
            .map(res => res.json().results.map(data => new Team(data)))
            .catch((err, caught) => {
                this.health.criticalError(JSON.stringify(err, null, 4));
                throw err;
            });
    }

    get(id: number): Observable<Team> {
        return this.http.get(`/api/teams/${id}/`).map(res => {
            return new Team(res.json());
        }).catch((err, caught) => {
            this.health.criticalError(JSON.stringify(err, null, 4));
            throw err;
        });
    }

    createOrUpdate(data, method: RequestMethod): Observable<Team> {
        let csrf = new CookieXSRFStrategy('csrftoken', 'X-CSRFToken');
        const url = method === RequestMethod.Put ?
            `/api/teams/${data.id}` : `/api/teams`;
        let request = new Request({
            method: method,
            url: url,
            body: data,
        });
        csrf.configureRequest(request);

        return this.http.request(request).map(res => {
            return new Team(res.json());
        }).catch((err, caught) => {
            this.health.criticalError(JSON.stringify(err, null, 4));
            throw err;
        });
    }

    create(data): Observable<Team> {
        return this.createOrUpdate(data, RequestMethod.Post);
    }

    update(data): Observable<Team> {
        return this.createOrUpdate(data, RequestMethod.Put);
    }

    askToJoin(teamId: number, playerId: number): Observable<any> {
        // FIXME: dirty example needs more work @bsko
        let csrf = new CookieXSRFStrategy('csrftoken', 'X-CSRFToken');
        let request = new Request({
            method: RequestMethod.Post,
            url: `/api/teams/${teamId}/players/`,
            body: { id: playerId, role: PlayerRole.RequestedToJoin },
        });
        csrf.configureRequest(request);

        return this.http.request(request).catch((err, caught) => {
            this.health.criticalError(JSON.stringify(err, null, 4));
            throw err;
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
