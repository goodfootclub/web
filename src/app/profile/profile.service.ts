import { Injectable, Inject, forwardRef } from '@angular/core';
import {
    Http,
    Request,
    CookieXSRFStrategy,
    RequestMethod,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { HealthService } from '../error-handling';
import { User } from '../types';


/**
 * Provides data about currently logged in user
 */
@Injectable()
export class ProfileService {

    currentUser: User;

    constructor(
        @Inject(forwardRef(() => HealthService)) public health: HealthService,
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
            this.health.criticalError(JSON.stringify(err, null, 4));
            throw err;
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
            this.health.criticalError(JSON.stringify(err, null, 4));
            throw err;
        });
    }
}
