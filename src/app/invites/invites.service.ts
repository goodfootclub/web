import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GameEvent, Team } from '../types';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class InvitesService {

    constructor(private http: Http) {}

    getCurrentUserTeamInvites():
    Observable<{count?: number, results: Team[]}> {
        return this.http.get('/api/teams/invites/')
            .map(res => {
                let data = res.json();
                data.results = data.results.map(item => new Team(item));
                return data;
            });
    }

    getCurrentUserGameInvites():
    Observable<{count?: number, results: GameEvent[]}> {
        return this.http.get('/api/games/invites/')
            .map(res => {
                let data = res.json();
                data.results = data.results.map(item => new GameEvent(item));
                return data;
            });
    }
}
