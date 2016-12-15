import { Injectable } from '@angular/core';
import {
    Http,
    Request,
    CookieXSRFStrategy,
    RequestMethod,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { User } from './../types';
import { HealthService } from '../error-handling';


@Injectable()
export class PlayersService {

    constructor(
        private http: Http,
        private health: HealthService,
    ) { }

    all(): Observable<User[]> {
        return this.http.get('/api/users/players/').map(res => {
            let data = res.json();
            for (let i = data.length - 1; i >= 0; i--) {
                data[i]['firstName'] = data[i]['first_name'];
                data[i]['lastName'] = data[i]['last_name'];
                if (data[i].img == null) {
                    data[i].img = (
                       `https://placekitten.com/` +
                       `${150 + data[i]['id'] % 50}/` +
                       `${150 + data[i]['id'] % 50}/`
                    );
                }
            }
            return data;
        }).catch((err, caught) => {
            this.health.criticalError(JSON.stringify(err, null, 4));
            throw err;
        });
    }

    get(id: number): Observable<User> {
        return this.http.get(`/api/users/players/${id}/`).map(res => {
            let data = res.json();
            data['firstName'] = data['first_name'];
            data['lastName'] = data['last_name'];
            return data;
        }).catch((err, caught) => {
            this.health.criticalError(JSON.stringify(err, null, 4));
            throw err;
        });
    }
}
