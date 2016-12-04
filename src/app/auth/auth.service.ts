import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

import { HealthService } from '../error-handling';
import { User } from 'app/types';


@Injectable()
export class AuthService implements CanActivate, CanActivateChild {

    currentUser: User = undefined;
    nextUrl: string;  // store the URL so we can redirect after logging in
    canActivateChild = this.canActivate;

    constructor(
        private http: Http,
        private router: Router,
        private health: HealthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.nextUrl = state.url;
        return this.isAuthenticated();
    }

    /**
     * Checks if user is authenticated, returns a boolean value and
     * redirects to login page if needed
     *
     * @param  {string}  redirectPath router path to redirect
     * @return {boolean | Observable<boolean>}
     */
    isAuthenticated(redirectPath = 'signup'): boolean | Observable<boolean> {

        // Helper function checks if user is null and may redirect to
        // the app's login page
        let checkAndRedirect = user => {
            if (user == null && redirectPath != null) {
                this.router.navigate([redirectPath]);
            }
            return user != null;
        };

        let user = this.getCurrentUser();

        if (user != null && 'map' in user) {
            return (user as Observable<User>).map(checkAndRedirect);
        } else {
            return checkAndRedirect(user);
        }
    }

    /**
     * Get current user data from the server
     */
    getCurrentUser(): User | Observable<User> {

        if (this.currentUser !== undefined) {
            return this.currentUser;
        }

        return this.http.get('/api/users/current').map(data => {
            let {id, username, first_name, last_name} = data.json();
            this.currentUser = {
                id: id,
                username: username,
                firstName: first_name,
                lastName: last_name,
            };
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
