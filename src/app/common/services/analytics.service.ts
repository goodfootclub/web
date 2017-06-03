import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { WindowRefService } from './window.service';

declare var ga: Function;

const dimensions = {
    WINDOW_ID: 'dimension3',
};

/**
 * Service to handle google analytics
 */
@Injectable()
export class AnalyticsService {

    windowId: string;

    constructor(
        private router: Router,
        private windowRef: WindowRefService,
    ) {
        this.windowId = this.uuid();
        ga('set', dimensions.WINDOW_ID, this.windowId);

        this.windowRef.window.addEventListener('error', ( { error } ) => {
            this.handleError((error && error.stack) ||
                (error && error.status && error.statusText) ||
                '(not set)');
        });

        this.router.events
            .filter(e => e instanceof NavigationEnd)
            .subscribe((event: NavigationEnd) => {
                ga('set', 'page', event.urlAfterRedirects);
                ga('send', 'pageview');
            });
    }


    handleEvent(event: CustomEvent) {
        ga('send', 'event', event);
    }

    handleError(error: string) {
        this.handleEvent({
            eventCategory: 'Script',
            eventAction: 'error',
            eventLabel: error,
            nonInteraction: true,
        } as CustomEvent);
    }

    private uuid(): string {
        let d = new Date().getTime();
        if (window.performance
            && typeof window.performance.now === 'function') {
            d += performance.now();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    };
}

export interface CustomEvent {
    eventCategory: string;
    eventLabel: string;
    eventAction: string;
    eventValue: number;
    nonInteraction: boolean;
}
