import { ErrorHandler } from '@angular/core';
import { environment } from '../../environments/environment';
import * as Raven from 'raven-js';

export class RavenErrorHandler implements ErrorHandler {

    constructor() {
        Raven
            .config('https://1e1793c10283418ebcfb3149fd378e1d@sentry.io/201642')
            .install();
    }

    handleError(err: any): void {
        Raven.captureException(err);
    }
}

export function ErrorHandlerFactory() {
    const ravenErrorhandler = environment.production ?
        new RavenErrorHandler() : { handleError: (err: any) => { } };
    return ravenErrorhandler;
}
