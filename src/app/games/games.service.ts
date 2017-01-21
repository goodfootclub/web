import { Injectable } from '@angular/core';
import {
    Http,
    Request,
    CookieXSRFStrategy,
    RequestMethod,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { GameEvent, RsvpStatus, Player, User } from 'app/types';
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

    setStatus(
        game: GameEvent,
        player: Player,
        status: RsvpStatus,
    ): Observable<any> {
        let csrf = new CookieXSRFStrategy('csrftoken', 'X-CSRFToken');

        let request = new Request({
            method: RequestMethod.Put,
            url: `/api/games/${game.id}/players/${player.rsvpId}/`,
            body: {
                'id': player.id,
                'rsvp': status,
                'team': player.team,
            },
        });

        csrf.configureRequest(request);

        return this.http.request(request);
    };

    addPlayer(game: GameEvent, user: User): Observable<any> {
        let csrf = new CookieXSRFStrategy('csrftoken', 'X-CSRFToken');

        let request = new Request({
            method: RequestMethod.Post,
            url: `/api/games/${game.id}/players/`,
            body: {
                'id': user.id,
                'rsvp': RsvpStatus.Going,
            },
        });

        csrf.configureRequest(request);

        return this.http.request(request);
    };

    removePlayer(game: GameEvent, player: Player): Observable<any> {
        let csrf = new CookieXSRFStrategy('csrftoken', 'X-CSRFToken');

        let request = new Request({
            method: RequestMethod.Delete,
            url: `/api/games/${game.id}/players/${player.rsvpId}/`,
        });

        csrf.configureRequest(request);

        return this.http.request(request);
    };

}
