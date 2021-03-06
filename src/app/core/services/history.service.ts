import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import 'rxjs/add/operator/filter';

/**
 * Service to keep history of user's routing
 */
@Injectable()
export class HistoryService {

    private routes: ParsedRoute[] = [];
    private excludeNext = false;

    constructor(
        private router: Router,
        private authService: AuthService,
    ) {
        this.router.events
            .filter(e => e instanceof RoutesRecognized)
            .filter(e => this.authService.isAuthenticated())
            .subscribe((e: RoutesRecognized) => {
                if (this.excludeNext) {
                    this.excludeNext = false;
                    return;
                }
                this.register(e);
            });
    }

    register(route: RoutesRecognized) {
        if ('/' === route.url) {
            this.routes = [];
            return;
        }
        const parsedRoute = this.parseUrl(route);
        const existingRoute = this.routes
            .find(r => r.parametrizedUrl === parsedRoute.parametrizedUrl);
        if (existingRoute) {
            const index = this.routes.indexOf(existingRoute);
            this.routes.splice(index + 1, 100);
        } else {
            this.routes.push(parsedRoute);
        }
    }

    back() {
        if (this.routes.length === 0) {
            this.router.navigate(['/']);
        } else {
            this.excludeNext = true;
            const nextOne = this.findNextOne();
            if (!nextOne) {
                this.router.navigate(['/']);
            } else {
                if (nextOne.parameters) {
                    this.router.navigate([
                        nextOne.initialUrl,
                        nextOne.parameters]);
                } else {
                    this.router.navigate([nextOne.initialUrl]);
                }
            }
        }
    }

    skipCurrent() {
        return this.routes.pop();
    }

    getHomePageIndex(): number {
        return this.routes.length - 1;
    }

    private findNextOne(): ParsedRoute {
        this.routes.pop();
        if (this.routes.length === 0) { return null; }
        return this.routes[this.routes.length - 1];
    }

    private parseUrl(route: RoutesRecognized): ParsedRoute {
        const parsed = new ParsedRoute();
        parsed.urlParameters = {};
        parsed.parameters = {};
        parsed.initialParts = route.url.split('/')
            .map(i => i.trim())
            .filter(i => i);
        const lastIndex = parsed.initialParts.length - 1;
        const lastParam = parsed.initialParts[lastIndex];
        const parametersList = lastParam.split(';');
        if (parametersList.length > 1) {
            parsed.initialParts[lastIndex] = parametersList.shift();
            parametersList.forEach(str => {
                const param = str.split('=');
                parsed.parameters[param[0]] = param[1];
            });
        }
        parsed.initialUrl = route.url.split(';')[0];
        let iter = 0;
        parsed.parametrizedParts = parsed.initialParts.map(i => {
            if (this.isNumber(i)) {
                const paramName = `attr${++iter}`;
                parsed.urlParameters[paramName] = i;
                return paramName;
            }
            return i;
        });
        parsed.parametrizedUrl = '/' + parsed.parametrizedParts.join('/');
        return parsed;
    }

    private isNumber(value: string) {
        return /^\d+$/.test(value);
    }
}

class ParsedRoute {
    initialUrl: string;
    initialParts: string[];
    parametrizedUrl: string;
    parametrizedParts: string[];
    urlParameters: any;
    parameters: any;
}
