import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TitleService } from '../title.service';
import { ProfileService } from './profile.service';
import { User } from '../types';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.styl'],
})
export class ProfileComponent {

    user: User;

    constructor(
        public profile: ProfileService,
        public title: TitleService,
        private router: Router,
    ) {
        title.setTitle('Profile');
        profile.getCurrentUser().subscribe(user => {
            this.user = user;
        });
    }

    logout() {
        this.profile.logout().subscribe(() => {
            this.router.navigate(['/signup']);
        });
    }
}
