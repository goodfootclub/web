import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AppToastyService } from '../common/services/toasty.service';

@Injectable()
export class HttpErrorHandler {

    constructor(private toastyService: AppToastyService) {}

    handleError(error: Response): void {
        const status = error.status;
        const statusText = error.statusText;
        let message = 'Error on server!';
        if (error) {
            const err = error.json();
            const keys = Object.keys(err);
            const lines = keys.map((key) => `${key}: ${err[key]}`);
            message = lines.join('\n');
        }
        this.toastyService.error(message);
    }

}
