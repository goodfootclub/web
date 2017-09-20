/* tslint:disable:no-unused-variable */

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { TestBed, async, inject } from '@angular/core/testing';
import { Http } from '@angular/http';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import { AppToastyService } from '../core/services/toasty.service';
import { WindowRefService } from '../core/services/window.service';


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

class AppToastyServiceStub {
    success(message: string, title?: string): void {}
}

class WindowRefServiceStub {}

describe('Service: Auth', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                // { provide: APP_BASE_HREF, useValue: '/' }
                AuthService,
                { provide: Http, useClass: HttpStub },
                { provide: Router, useClass: RouterStub },
                { provide: AppToastyService, useClass: AppToastyServiceStub },
                { provide: WindowRefService, useClass: WindowRefServiceStub },
            ],
        });
    });

    it('should exist', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));

    it('should navigate to login page if user is not logged in', async(
        inject(
            [AuthService, Router],
            (service: AuthService, router: RouterStub) => {
                const result = service.canActivate(
                    <ActivatedRouteSnapshot>{},
                    <RouterStateSnapshot>{ url: '' },
                );
                expect(router.path).toEqual(['/']);
            },
        ),
    ));
});
