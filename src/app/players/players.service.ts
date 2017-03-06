import { Injectable } from '@angular/core';
import {
    Http,
    Request,
    CookieXSRFStrategy,
    RequestMethod,
    URLSearchParams,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { User, PlayerRole } from 'app/types';
import { HealthService } from 'app/error-handling';


@Injectable()
export class PlayersService {

    constructor(
        private http: Http,
        private health: HealthService,
    ) { }

    all(search?: string, limit?: number, offset?: number): Observable<User[]> {
        const params: URLSearchParams = new URLSearchParams();
        if (limit) { params.set('limit', limit.toString()); }
        if (offset) { params.set('offset', offset.toString()); }
        if (search) { params.set('search', search); }
        return this.http.get('/api/users/players/', { search: params })
            .map(res => res.json().results.map(data => new User(data)))
            .catch((err, caught) => {
                this.health.criticalError(JSON.stringify(err, null, 4));
                throw err;
            });
    }

    get(id: number): Observable<User> {
        return this.http.get(`/api/users/players/${id}/`).map(res => {
            return new User(res.json());
        }).catch((err, caught) => {
            this.health.criticalError(JSON.stringify(err, null, 4));
            throw err;
        });
    }

    inviteToTeam(teamId: number, playerId: number): Observable<any> {
        let csrf = new CookieXSRFStrategy('csrftoken', 'X-CSRFToken');
        let request = new Request({
            method: RequestMethod.Post,
            url: `/api/teams/${teamId}/players/`,
            body: { id: playerId, role: PlayerRole.Invited },
        });
        csrf.configureRequest(request);

        return this.http.request(request).catch((err, caught) => {
            this.health.criticalError(JSON.stringify(err, null, 4));
            throw err;
        });
    }
}
