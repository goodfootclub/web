import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild, NavigationExtras,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { WindowRefService } from '../core/services/window.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


@Injectable()
export class AuthService implements CanActivate, CanActivateChild {

    activationsChecks = 0;
    canActivateChild = this.canActivate;

    constructor(
        private router: Router,
        private windowRef: WindowRefService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.activationsChecks += 1;
        return this.isAuthenticated('/', state.url);
    }

    /**
     * Checks if user is authenticated, returns a boolean value and
     * redirects to login page if needed
     *
     * @param  {string}  redirectPath router path to redirect
     * @return {boolean | Observable<boolean>}
     */
    isAuthenticated(redirectPath?: string, nextUrl?: string): boolean {
        const csrf = Cookie.get(Cookies.CSRFTOKEN);
        const jwtToken = this.windowRef.token;
        const isAuthenticated = !!csrf || !!jwtToken;
        if (!isAuthenticated && redirectPath) {
            if (nextUrl) {
                const navigationExtras =
            { queryParams: { 'redirect_url': nextUrl } } as NavigationExtras;
                this.router.navigate([redirectPath], navigationExtras);
            } else {
                this.router.navigate([redirectPath]);
            }
        }
        return isAuthenticated;
    }
}

export class Cookies {
    public static readonly CSRFTOKEN = 'csrftoken';
}
