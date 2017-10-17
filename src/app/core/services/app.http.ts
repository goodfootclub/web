import { Injectable } from '@angular/core';
import {
    Http,
    Request,
    RequestOptions,
    Response,
    Headers,
    RequestOptionsArgs,
    CookieXSRFStrategy,
    RequestMethod,
    XHRBackend,
} from '@angular/http';
import { StatusService } from './status.service';
import { WindowRefService } from './window.service';
import { HttpErrorHandler } from 'app/error-handling/http-error.service';
import { Observable } from 'rxjs/Observable';
import { Cookies } from '../../auth/auth.service';
import 'rxjs/add/operator/finally';

const UNSAFE_METHODS = [
    RequestMethod.Delete,
    RequestMethod.Patch,
    RequestMethod.Post,
    RequestMethod.Put,
];

@Injectable()
export class AppHttp extends Http {

    createAuthorizationHeader(headers: Headers, token: string) {
        headers.append('Authorization', 'JWT ' + token);
    }

    constructor(
        backend: XHRBackend,
        defaultOptions: RequestOptions,
        private statusService: StatusService,
        private errorHandler: HttpErrorHandler,
        private windowRef: WindowRefService,
    ) {
        super(backend, defaultOptions);
    }

    request(request: Request,
            options?: RequestOptionsArgs): Observable<Response> {

        const token = this.windowRef.token;
        if (request && token) {
            this.createAuthorizationHeader(request.headers, token);
        } else if (request && UNSAFE_METHODS.indexOf(request.method) > -1) {
            const csrf =
                new CookieXSRFStrategy(Cookies.CSRFTOKEN, 'X-CSRFToken');
            csrf.configureRequest(request);
        }
        this.statusService.startRequesting();
        return super.request(request, options)
            .finally(() => this.statusService.stopRequesting())
            .catch(this.errorHandler.handleError);
    }
}

export const HttpProvider = {
    provide: Http,
    useFactory: httpFactory,
    deps: [
        XHRBackend,
        RequestOptions,
        StatusService,
        HttpErrorHandler,
        WindowRefService,
    ],
};

export function httpFactory(
    backend: XHRBackend,
    defaultOptions: RequestOptions,
    statusService: StatusService,
    errorHandler: HttpErrorHandler,
    windowRef: WindowRefService,
) {
    return new AppHttp(
        backend, defaultOptions, statusService, errorHandler, windowRef);
}
