import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Team } from 'app/types';
import { HealthService } from 'app/error-handling';


@Injectable()
export class TeamsService {

    constructor(
        private http: Http,
        private health: HealthService,
    ) { }


    all(): Observable<Team[]> {
        return this.http.get('/api/teams/')
            .map(res => res.json().map(data => new Team(data)))
            .catch((err, caught) => {
                this.health.criticalError(JSON.stringify(err, null, 4));
                throw err;
            });
    }

    get(id: number): Observable<Team> {
        return this.http.get(`/api/teams/${id}/?details`).map(res => {
            return new Team(res.json());
        }).catch((err, caught) => {
            this.health.criticalError(JSON.stringify(err, null, 4));
            throw err;
        });
    }

    create(data): Observable<Team> {
        return this.http.post(`/api/teams/`, data).map(res => {
            return new Team(res.json());
        }).catch((err, caught) => {
            this.health.criticalError(JSON.stringify(err, null, 4));
            throw err;
        });
    }
}
