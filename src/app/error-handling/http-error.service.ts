import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { AppToastyService } from '../common/services/toasty.service';
import Exclusions, { Exclusion } from './excluded-endpoints';
import { Observable } from 'rxjs/Observable';

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
        throw error;
    }

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
}
