import { Injectable } from '@angular/core';
import {
    Http,
    Request,
    CookieXSRFStrategy,
    RequestMethod,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { GameEvent } from './../types';
import { HealthService } from '../error-handling';


@Injectable()
export class EventsService {

    constructor(
        private http: Http,
        private health: HealthService,
    ) { }

    all(): Observable<GameEvent[]> {
        return this.http.get('/api/games/').map(data => {
            return data.json();
        }).catch((err, caught) => {
            this.health.criticalError(JSON.stringify(err, null, 4));
            throw err;
        });
    }

    get(id: number): Observable<GameEvent> {
        return this.http.get(`/api/games/${id}/`).map(res => {
            let data = res.json();

            data.playersById = {};

            for (let player of data.players) {
                data.playersById[player.player] = player;
                let team = data.teams[player.team];
                if (team == null) {
                    continue;
                }

                if (team.playersInGame == null) {
                    team.playersInGame = [];
                }

                if (player.status >= 0) {
                    team.playersInGame.push(player);
                }
            }
            return data;
        }).catch((err, caught) => {
            this.health.criticalError(JSON.stringify(err, null, 4));
            throw err;
        });
    }

    setStatus(game, user, status): Observable<any> {
        let csrf = new CookieXSRFStrategy('csrftoken', 'X-CSRFToken');

        let request = new Request({
            method: RequestMethod.Put,
            url: `/api/games/${game.id}/players/${user.id}/`,
            body: {
                'player': user.player,
                'status': status,
                'team': user.team,
            },
        });

        csrf.configureRequest(request);

        return this.http.request(request);
    };
}
