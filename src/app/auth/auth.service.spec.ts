/* tslint:disable:no-unused-variable */

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { TestBed, async, inject } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { Http } from '@angular/http';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import { HealthService } from '../error-handling';


class HttpStub {
    data = {
        'id': 42,
        'username': 'jdoe',
        'first_name': 'John',
        'last_name': 'Doe',
    };

    url: string;
    requestDidHappen = false;

    get(url: string) {
        this.requestDidHappen = true;
        this.url = url;
        return Observable.of({ 'data': this.data });
    }
}

class RouterStub {
    path: string[];
    navigate(path: string[]) {
        this.path = path;
    }
}

describe('Service: Auth', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                // { provide: APP_BASE_HREF, useValue: '/' }
                AuthService,
                HealthService,
                { provide: Http, useClass: HttpStub },
                { provide: Router, useClass: RouterStub },
            ],
        });
    });

    it('should exist', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));

    it('should send an http request to see if a user is logged in', async(
        inject([AuthService, Http], (service: AuthService, http: HttpStub) => {
            service.canActivate(
                <ActivatedRouteSnapshot>{},
                <RouterStateSnapshot>{ url: '' }
            );
            expect(http.requestDidHappen).toBeTruthy();
            expect(http.url).toEqual('/api/users/current');
        })
    ));

    it('should navigate to login page if user is not logged in', async(
        inject(
            [AuthService, Router],
            (service: AuthService, router: RouterStub) => {
                service.currentUser = null;
                service.canActivate(
                    <ActivatedRouteSnapshot>{},
                    <RouterStateSnapshot>{ url: '' }
                );
                expect(router.path).toEqual(['signup']);
            }
        )
    ));
});