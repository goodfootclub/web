import { Injectable } from '@angular/core';
import {
    Http,
    Request,
    RequestMethod,
    URLSearchParams,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { GameEvent, RsvpStatus, Player, User } from 'app/types';
import { AppToastyService } from '../common/services/toasty.service';


@Injectable()
export class GamesService {

    constructor(
        private http: Http,
        private toastyService: AppToastyService,
    ) { }

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
        let request = new Request({
            method: RequestMethod.Post,
            url: `/api/games/`,
            body: data,
        });
        return this.http.request(request).map(res => {
            this.toastyService.success('New game created!');
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
        let request = new Request({
            method: RequestMethod.Put,
            url: `/api/games/${game.id}/players/${player.rsvpId}/`,
            body: {
                'id': player.id,
                'rsvp': status,
                'team': player.team,
            },
        });
        return this.http.request(request).do(() => {
            this.toastyService.success('Status changed!');
        });
    };

    addPlayer(game: GameEvent, user: User): Observable<any> {
        let request = new Request({
            method: RequestMethod.Post,
            url: `/api/games/${game.id}/players/`,
            body: {
                'id': user.id,
                'rsvp': RsvpStatus.Going,
            },
        });
        return this.http.request(request).do(() => {
            this.toastyService.success('Player added!');
        });
    };

    removePlayer(game: GameEvent, player: Player): Observable<any> {
        let request = new Request({
            method: RequestMethod.Delete,
            url: `/api/games/${game.id}/players/${player.rsvpId}/`,
        });
        return this.http.request(request).do(() => {
            this.toastyService.success('Player removed!');
        });
    };
}
