import { Injectable, Inject, forwardRef } from '@angular/core';
import {
    Http,
    Request,
    CookieXSRFStrategy,
    RequestMethod,
    URLSearchParams,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { User, GameEvent } from '../types';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


/**
 * Provides data about currently logged in user
 */
@Injectable()
export class ProfileService {

    currentUser: User;

    constructor(
        public http: Http,
    ) {}

    /**
     * Get current user data (from the server if needed)
     */
    getCurrentUser(): Observable<User> {
        if (this.currentUser !== undefined) {
            return Observable.of(this.currentUser);
        }
        return this.http.get('/api/users/me/').map(response => {
            this.currentUser = new User(response.json());
            return this.currentUser;
        }).catch((err, caught) => {
            if (err.status === 403) {
                this.currentUser = null;
                return Observable.of(null);
            };
            throw err;
        });
    }

    // FIXME: I think this belongs in GameService
    // Also define type for search result... or move count somewhere...
    getCurrentUserGames(limit?: number, offset?: number):
    Observable<{count?: number, results: GameEvent[]}> {
        const params: URLSearchParams = new URLSearchParams();
        if (limit) { params.set('limit', limit.toString()); }
        if (offset) { params.set('offset', offset.toString()); }
        return this.http.get('/api/games/my/', { search: params })
            .map(res => {
                let data = res.json();
                data.results = data.results.map(item => new GameEvent(item));
                return data;
            });
    }

    update(data): Observable<User> {
        data['first_name'] = data.firstName;
        delete data['firstName'];
        data['last_name'] = data.lastName;
        delete data['lastName'];

        let csrf = new CookieXSRFStrategy('csrftoken', 'X-CSRFToken');
        let request = new Request({
            method: RequestMethod.Put,
            url: `/api/users/me/`,
            body: data,
        });
        csrf.configureRequest(request);

        return this.http.request(request).map(response => {
            this.currentUser = new User(response.json());
            return this.currentUser;
        }).catch((err, caught) => {
            throw err;
        });
    }
}
