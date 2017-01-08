import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Location } from 'app/types';
import { HealthService } from 'app/error-handling';


@Injectable()
export class LocationsService {

    constructor(
        private http: Http,
        private health: HealthService,
    ) { }


    all(): Observable<Location[]> {
        return this.http.get('/api/games/locations/')
            .map(res => res.json().map(data => new Location(data)))
            .catch((err, caught) => {
                this.health.criticalError(JSON.stringify(err, null, 4));
                throw err;
            });
    }
}
