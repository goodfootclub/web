import { Component } from '@angular/core';

import { ProfileService } from 'app/profile';
import { User } from 'app/types';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.styl'],
})
export class HomeComponent {

    user: User;

    constructor(profile: ProfileService) {
        profile.getCurrentUser().subscribe(user => {
            this.user = user;
        });
    }
}
