import { Injectable, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { WindowRefService } from './window.service';

declare var ga: Function;

/**
 * Service to handle google analytics
 */
@Injectable()
export class AnalyticsService implements OnInit {

    constructor(
        private router: Router,
        private windowRef: WindowRefService,
    ) {}

    ngOnInit(): void {
        this.windowRef.window.addEventListener('error', ( { error } ) => {
            this.handleError((error && error.stack) || '(not set)');
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
}

export interface CustomEvent {
    eventCategory: string;
    eventLabel: string;
    eventAction: string;
    eventValue: number;
    nonInteraction: boolean;
}
