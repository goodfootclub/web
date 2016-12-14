import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { HealthService } from '../error-handling';
import { User, Gender } from '../types';


/**
 * Provides data about currently logged in user
 */
@Injectable()
export class ProfileService {

    currentUser: User;

    constructor(
        private health: HealthService,
        private http: Http,
    ) {}

    /**
     * Get current user data (from the server if needed)
     */
    getCurrentUser(): Observable<User> {

        if (this.currentUser !== undefined) {
            return Observable.of(this.currentUser);
        }

        return this.http.get('/api/users/me/').map(response => {
            let data = response.json();
            let gender: Gender;
            if (data['gender'] != null) {
                gender = data['gender'] === 'M' ? Gender.Male : Gender.Female;
            }

            if (data['cover'] == null) {
                data['cover'] = (`https://placekitten.com/` +
                               `${600 + data['id'] % 50}/` +
                               `${300 + data['id'] % 50}/`);
            }
            if (data['img'] == null) {
                data['img'] = (`https://placekitten.com/` +
                               `${150 + data['id'] % 50}/` +
                               `${150 + data['id'] % 50}/`);
            }

            this.currentUser = {
                id: data['id'],
                firstName: data['first_name'],
                lastName: data['last_name'],
                bio: data['bio'],
                birthday: new Date(data['birthday']),
                cover: data['cover'],
                email: data['email'],
                gender: gender,
                img: data['img'],
                phone: data['phone'],
            };
            return this.currentUser;
        }).catch((err, caught) => {
            if (err.status === 403) {
                this.currentUser = null;
                return Observable.of(null);
            };
            this.health.criticalError(JSON.stringify(err, null, 4));
            throw err;
        });
    }
}
