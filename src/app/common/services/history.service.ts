import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

/**
 * Service to keep history of user's routing
 */
@Injectable()
export class HistoryService {

    private readonly maxSize = 10;
    private routes: RoutesRecognized[] = [];
    private currentRoute: RoutesRecognized;
    private excludeNext = false;

    constructor(
        private router: Router,
    ) {
        this.router.events
            .filter(e => e instanceof RoutesRecognized)
            .subscribe((e: RoutesRecognized) => {
                if (this.excludeNext) {
                    this.excludeNext = false;
                    return; // do nothing. should be back button click
                } else if (this.currentRoute) {
                    this.add(this.currentRoute);
                }
                this.currentRoute = e;
            });
    }

    add(route: RoutesRecognized) {
        this.routes.push(route);
        if (this.routes.length > this.maxSize) {
            this.routes.shift();
        }
    }

    back() {
        if (this.routes.length === 0) {
            this.router.navigate(['/']);
        } else {
            let found = false;
            let url = '';
            while (!found) {
                const rr = this.routes.pop();
                url = rr.url;
                found = (url.indexOf(';') === -1
                    && url.indexOf('/edit') === -1);
            }
            this.excludeNext = true;
            if (found) {
                this.router.navigate([url]);
            } else {
                this.router.navigate(['/']);
            }
        }
    }

    getHomePageIndex(): number {
        const index =  this.routes.map(i => i.url).lastIndexOf('/');
        if (index === -1) { return -1; }
        return this.routes.length - index - 1;
    }
}
