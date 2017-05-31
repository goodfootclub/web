import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { ProfileService } from '../profile';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';



@Injectable()
export class AuthService implements CanActivate, CanActivateChild {

    private readonly csrfCookie = 'csrftoken';

    activationsChecks = 0;
    nextUrl: string;  // store the URL so we can redirect after logging in
    canActivateChild = this.canActivate;

    constructor(
        private router: Router,
        public profile: ProfileService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.activationsChecks += 1;
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
        const csrf = Cookie.get(this.csrfCookie);
        const isAuthenticated = !!csrf;
        if (!isAuthenticated) {
            this.router.navigate([redirectPath]);
        }
        return isAuthenticated;
    }
}
