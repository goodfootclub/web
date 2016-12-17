import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

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
        private health: HealthService,
        private http: Http,
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
}
