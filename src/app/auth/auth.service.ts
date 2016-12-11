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
import 'rxjs/add/operator/do';

import { HealthService } from '../error-handling';
import { User } from 'app/types';
import { ProfileService } from 'app/profile';


@Injectable()
export class AuthService implements CanActivate, CanActivateChild {

    nextUrl: string;  // store the URL so we can redirect after logging in
    canActivateChild = this.canActivate;

    constructor(
        private health: HealthService,
        private http: Http,
        private router: Router,
        public profile: ProfileService,
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

        let user = this.profile.getCurrentUser();
        return (user as Observable<User>).map(checkAndRedirect);
    }
}
