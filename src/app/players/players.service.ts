import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { User } from 'app/types';
import { HealthService } from 'app/error-handling';


@Injectable()
export class PlayersService {

    constructor(
        private http: Http,
        private health: HealthService,
    ) { }

    all(): Observable<User[]> {
        return this.http.get('/api/users/players/')
            .map(res => res.json().map(data => new User(data)))
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
}
