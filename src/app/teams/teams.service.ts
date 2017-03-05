import { Injectable } from '@angular/core';
import {
    Http,
    Request,
    CookieXSRFStrategy,
    RequestMethod,
    URLSearchParams,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Team } from 'app/types';
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

    create(data): Observable<Team> {
        let csrf = new CookieXSRFStrategy('csrftoken', 'X-CSRFToken');
        let request = new Request({
            method: RequestMethod.Post,
            url: `/api/teams/`,
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
}
