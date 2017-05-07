import { Injectable } from '@angular/core';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';

/**
 * Service to keep history of user's routing
 */
@Injectable()
export class HistoryService {

    private readonly maxSize = 5;
    private routes: RoutesRecognized[] = [];

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
    ) {
        this.router.events
            .filter(e => e instanceof RoutesRecognized)
            .subscribe((e: RoutesRecognized) => {
                this.add(e);
            });
    }

    add(route: RoutesRecognized) {
        this.routes.push(route);
        console.log(this.activeRoute);
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
            console.log(`next url is ${url} from ${this.routes.map((i) => i.url)}`);
            if (found) {
                this.router.navigate([url]);
            } else {
                this.router.navigate(['/']);
            }
        }
    }
}
