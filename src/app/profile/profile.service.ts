import { Injectable } from '@angular/core';
import {
    Http,
    Request,
    Response,
    RequestMethod,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { User } from '../types';
import { AppToastyService } from '../core/services/toasty.service';
import { WindowRefService } from '../core/services/window.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Cookies } from '../auth/auth.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

/**
 * Provides data about currently logged in user
 */
@Injectable()
export class ProfileService {

    private currentUser: User;

    constructor(
        private http: Http,
        private toastyService: AppToastyService,
        private windowRef: WindowRefService,
    ) {}

    /**
     * Login with credentials
     */
    login(username: string, password: string): Observable<Response> {
        let request = new Request({
            method: RequestMethod.Post,
            url: `/api/auth/jwt/`,
            body: {
                username: username,
                password: password,
            },
        });
        return this.http.request(request)
            .map((resp: Response) => {
                this.windowRef.token = resp.json().token;
                return resp;
            });
    }

    /**
     * Register with credentials
     */
    register(email: string, username: string, password: string) {
        let request = new Request({
            method: RequestMethod.Post,
            url: '/api/auth/register/',
            body: {
                email: email,
                username: username,
                password: password,
            },
        });
        return this.http.request(request);
    }

    /**
     * Activate account
     */
    activate(uid: string, token: string) {
        let request = new Request({
            method: RequestMethod.Post,
            url: '/api/auth/activate/',
            body: {
                uid: uid,
                token: token,
            },
        });
        return this.http.request(request);
    }

    delete(): Observable<any> { // TODO
        let request = new Request({
            method: RequestMethod.Post,
            url: `/api/auth/jwt/`,
            body: { /* TODO */ },
        });
        return this.http.request(request);
    }

    /**
     * Get current user data and update it from server if needed
     */
    getCurrentUser(): Observable<User> {
        if (this.currentUser !== undefined) {
            return Observable.of(this.currentUser);
        }
        return this.updateCurrentUser();
    }

    /**
     * Reset user's password
     * @param email
     * @returns {Observable<Response>}
     */
    resetPassword(email: string): Observable<Response> {
        let request = new Request({
            method: RequestMethod.Post,
            url: `/api/auth/password/reset/`,
            body: {
                email: email,
            },
        });
        return this.http.request(request);
    }

    /**
     * Changes user's password
     * @param uid
     * @param token
     * @param newPassword
     * @returns {Observable<Response>}
     */
    changePassword(uid: string,
                   token: string,
                   newPassword: string): Observable<Response> {
        let request = new Request({
            method: RequestMethod.Post,
            url: `/api/auth/password/reset/confirm/`,
            body: {
                uid: uid,
                token: token,
                new_password: newPassword,
            },
        });
        return this.http.request(request);
    }

    /**
     * Get current user data from the server
     */
    updateCurrentUser(): Observable<User> {
        return this.http.get('/api/users/me/').map(response => {
            this.currentUser = new User(response.json());
            return this.currentUser;
        }).catch((err, caught) => {
            if (err.status === 401 || err.status === 403) {
                this.currentUser = null;
                return Observable.of(null);
            };
            throw err;
        });
    }

    update(data): Observable<User> {
        data['first_name'] = data.firstName;
        delete data['firstName'];
        data['last_name'] = data.lastName;
        delete data['lastName'];
        let request = new Request({
            method: RequestMethod.Put,
            url: `/api/users/me/`,
            body: data,
        });
        return this.http.request(request).map(response => {
            this.toastyService.success('User info updated!');
            this.currentUser = new User(response.json());
            return this.currentUser;
        });
    }

    logout(): Observable<Response> {
        return this.http.get('/api/auth/logout')
            .do(this.logoutOnFrontEnd.bind(this));
    }

    logoutOnFrontEnd() {
        Cookie.delete(Cookies.CSRFTOKEN);
        this.windowRef.deleteToken();
    }
}
