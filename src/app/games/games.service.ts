import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
    Http,
    Request,
    CookieXSRFStrategy,
    RequestMethod,
    URLSearchParams,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { GameEvent, RsvpStatus, Player, User } from 'app/types';

@Injectable()
export class GamesService {

    datePipe: DatePipe;

    constructor(
        private http: Http,
    ) {
        this.datePipe = new DatePipe('en-US');
    }

    all(search?: string, limit?: number, offset?: number):
    Observable<GameEvent[]> {
        const params: URLSearchParams = new URLSearchParams();
        if (limit) { params.set('limit', limit.toString()); }
        if (offset) { params.set('offset', offset.toString()); }
        if (search) { params.set('search', search); }
        return this.http.get('/api/games/', { search: params })
            .map(res => res.json().results.map(data => new GameEvent(data)))
            .catch((err, caught) => {
                throw err;
            });
    }

    get(id: number): Observable<GameEvent> {
        return this.http.get(`/api/games/${id}/`).map(res => {
            return new GameEvent(res.json());
        }).catch((err, caught) => {
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
