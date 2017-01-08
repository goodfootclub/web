import { Injectable } from '@angular/core';
import {
    Http,
    Request,
    CookieXSRFStrategy,
    RequestMethod,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { GameEvent } from 'app/types';
import { HealthService } from 'app/error-handling';


@Injectable()
export class GamesService {

    constructor(
        private http: Http,
        private health: HealthService,
    ) { }

    all(): Observable<GameEvent[]> {
        return this.http.get('/api/games/')
            .map(res => res.json().map(data => new GameEvent(data)))
            .catch((err, caught) => {
                this.health.criticalError(JSON.stringify(err, null, 4));
                throw err;
            });
    }

    get(id: number): Observable<GameEvent> {
        return this.http.get(`/api/games/${id}/?details`).map(res => {
            return new GameEvent(res.json());
        }).catch((err, caught) => {
            this.health.criticalError(JSON.stringify(err, null, 4));
            throw err;
        });
    }

    create(data): Observable<GameEvent> {
        let csrf = new CookieXSRFStrategy('csrftoken', 'X-CSRFToken');
        let request = new Request({
            method: RequestMethod.Post,
            url: `/api/games/`,
            body: data,
        });
        csrf.configureRequest(request);

        return this.http.request(request).map(res => {
            return new GameEvent(res.json());
        }).catch((err, caught) => {
            this.health.criticalError(JSON.stringify(err, null, 4));
            throw err;
        });
    }
}
