import { Component, OnInit } from '@angular/core';

import { ProfileService } from 'app/profile';
import { User, GameEvent } from 'app/types';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.styl'],
})
export class HomeComponent implements OnInit {

    user: User;

    constructor(
        private profile: ProfileService,
    ) {}

    ngOnInit(): void {
        this.profile.getCurrentUser().subscribe(user => {
            this.user = user;
        });
    }
}
