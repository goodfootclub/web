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

const DATE_GROUPS = {
    '0': 'today',
    '1': 'tomorrow',
    '2': 'in a week',
    '3': 'in a month',
    '4': 'later',
}

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

    groupGames(games: GameEvent[]): { [id: string]: GameEvent[] } {
        const groupedGames: { [id: string]: GameEvent[] } = {};
        if (games) {
            const now = new Date();
            games.forEach((game) => {
                const gameDate = new Date(game.datetime as string);
                const group = this.findGroupForGame(now, gameDate);
                if (groupedGames[group] == null) {
                    groupedGames[group] = [];
                }
                groupedGames[group].push(game);
            });
        }
        return groupedGames;
    }

    private findGroupForGame(now: Date, date: Date): string {
        date.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);
        if (now.getTime() === date.getTime()) {
            return DATE_GROUPS['0'];
        }
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays =
            Math.round(Math.abs((date.getTime() - now.getTime()) / (oneDay)));
        if (diffDays === 1) {
            return DATE_GROUPS['1'];
        } else if (diffDays <= 7) {
            return DATE_GROUPS['2'];
        } else if (diffDays <= 30) {
            return DATE_GROUPS['3'];
        }
        return DATE_GROUPS['4'];
    }
}
