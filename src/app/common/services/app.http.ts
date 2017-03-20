import { Injectable } from '@angular/core';
import { Http,
    Request,
    RequestOptions,
    Response,
    RequestOptionsArgs,
    CookieXSRFStrategy,
    RequestMethod,
    XHRBackend,
} from '@angular/http';
import { StatusService } from './status.service';
import { HttpErrorHandler } from '../../error-handling/http-error.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppHttp extends Http {

    get securedMethods(): RequestMethod[] {
        return [
            RequestMethod.Post,
            RequestMethod.Put,
            RequestMethod.Delete,
        ];
    }

    constructor(backend: XHRBackend,
        defaultOptions: RequestOptions,
        private statusService: StatusService,
        private errorHandler: HttpErrorHandler,
    ) {
        super(backend, defaultOptions);
    }

    request(request: Request,
            options?: RequestOptionsArgs): Observable<Response> {
        if (request && this.securedMethods.indexOf(request.method) > -1) {
            let csrf = new CookieXSRFStrategy('csrftoken', 'X-CSRFToken');
            csrf.configureRequest(request);
        }
        this.statusService.startRequesting();
        return super.request(request, options)
            .do(() => this.statusService.stopRequesting())
            .catch(this.handleError.bind(this));
    }

    handleError(error: Response): Observable<Response> {
        this.statusService.stopRequesting();
        this.errorHandler.handleError(error);
        throw error;
    }
}

export const HttpProvider = {
    provide: Http,
    useFactory: httpFactory,
    deps: [ XHRBackend, RequestOptions, StatusService, HttpErrorHandler],
};

export function httpFactory(backend: XHRBackend,
    defaultOptions: RequestOptions,
    statusService: StatusService,
    errorHandler: HttpErrorHandler,
) {
    return new AppHttp(backend, defaultOptions, statusService, errorHandler);
}
