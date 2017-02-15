import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Location } from 'app/types';
import { HealthService } from 'app/error-handling';


@Injectable()
export class LocationsService {

    constructor(
        private http: Http,
        private health: HealthService,
    ) { }


    all(search?: string): Observable<Location[]> {
        const params: URLSearchParams = new URLSearchParams();
        if (search) { params.set('search', search); }
        return this.http.get('/api/games/locations/', {search: params})
            .map(res => res.json().results.map(data => new Location(data)))
            .catch((err, caught) => {
                this.health.criticalError(JSON.stringify(err, null, 4));
                throw err;
            });
    }
}
