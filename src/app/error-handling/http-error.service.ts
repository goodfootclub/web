import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import Exclusions, { Exclusion } from './excluded-endpoints';
import { Cookies } from '../auth/auth.service';

import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Observable } from 'rxjs/Observable';
import { AppToastyService } from '../core/services/toasty.service';

/**
 * HttpErrorHandler - simple class for handeling request errors
 *
 * handleError method is meant to be passed as a .cath argument to
 * an Observable returned by the Http servivce request methods
 */
@Injectable()
export class HttpErrorHandler {

    constructor(
        private toastyService: AppToastyService,
        private router: Router,
    ) {
        this.handleError = this.handleError.bind(this);
    }

    handleError(error: Response): Observable<Response> {
        if (!this.isExcluded(error)) {
            const status = error.status;
            if (status === 401) {
                this.handleUnauthorizedError(error);
            } else {
                this.handleDefaultError(error);
            }
        }
        throw error;
    }

    /**
     * This method specifies if error response should be handled
     *  by common error handling functionality
     * @see Exclusions
     * @param error http response object
     * @returns {boolean} true if this error response
     *  should be excluded from common error handling
     */
    private isExcluded(error: Response) {
        const index = error.url.indexOf('/api');
        if (index === -1) { return false; }
        const url = error.url.substr(index + '/api'.length);
        const status = error.status;
        const tree =
            (this.router.parseUrl(url).root.children.primary.segments || [])
                .filter((item) => item.path);
        return Exclusions.LIST.some((ex: Exclusion) => {
            return ex.status === status && ex.matcher(tree);
        });
    }

    /**
     * If an 'Unauthorized' error occurs while getting data from server
     * it will be handled here
     * @param error http response object
     */
    private handleUnauthorizedError(error: Response) {
        Cookie.delete(Cookies.CSRFTOKEN);
        this.router.navigate(['/auth/logout']);
        this.handleDefaultError(error);
    }

    /**
     * Common errors handler function
     * @param error http response object
     */
    private handleDefaultError(error: Response) {
        let message = 'Server Error!';
        let toast = this.toastyService.error;
        if (error) {
            const err = error.json();
            const keys = Object.keys(err);
            const lines = keys.map((key) => `${key}: ${err[key]}`);
            message = lines.join('\n');
            if (error.status < 500) {
                toast = this.toastyService.warning;
            }
        }
        toast(message);
    }
}
