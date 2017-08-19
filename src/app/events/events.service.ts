import { Injectable } from '@angular/core';
import {
    Http,
    Request,
    RequestMethod,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { GameEvent } from './../types';

@Injectable()
export class EventsService {

    constructor(
        private http: Http,
    ) { }

    all(): Observable<GameEvent[]> {
        return this.http.get('/api/games/').map(data => {
            return data.json();
        }).catch((err, caught) => {
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
            throw err;
        });
    }

    setStatus(game, user, status): Observable<any> {
        let request = new Request({
            method: RequestMethod.Put,
            url: `/api/games/${game.id}/players/${user.id}/`,
            body: {
                'player': user.player,
                'status': status,
                'team': user.team,
            },
        });
        return this.http.request(request);
    };
}
