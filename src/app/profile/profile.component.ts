import { Component } from '@angular/core';
import { TitleService } from '../title.service';
import { ProfileService } from './profile.service';
import { User } from '../types';
import { MenuService } from '../sidenav';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.styl'],
})
export class ProfileComponent {

    user: User;
    coverUrl: string;
    profilePicUrl: string;

    constructor(
        public menu: MenuService,
        public profile: ProfileService,
        public title: TitleService,
    ) {
        title.setTitle('Profile');
        profile.getCurrentUser().subscribe(user => {
            this.user = user;
            this.coverUrl = `url(${user.cover})`;
            this.profilePicUrl = `url(${user.img})`;
        });
    }
}
