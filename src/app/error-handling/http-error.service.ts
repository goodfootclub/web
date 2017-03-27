import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppToastyService } from '../common/services/toasty.service';


/**
 * HttpErrorHandler - simple class for handeling request errors
 *
 * handleError method is meant to be passed as a .cath argument to
 * an Observable returned by the Http servivce request methods
 */
@Injectable()
export class HttpErrorHandler {

    constructor(private toastyService: AppToastyService) {
        this.handleError = this.handleError.bind(this);
    }

    handleError(error: Response): Observable<Response> {
        const status = error.status;
        const statusText = error.statusText;
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
        throw error;
    }
}
