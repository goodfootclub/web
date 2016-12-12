import { Component } from '@angular/core';
import { TitleService } from 'app/title.service';
import { ProfileService } from './profile.service';
import { User } from 'app/types';
import { MenuService } from 'app/sidenav';


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
        title: TitleService,
        public profile: ProfileService,
        public menu: MenuService,
    ) {
        title.setTitle('Profile');
        profile.getCurrentUser().subscribe(user => {
            this.user = user;
            this.coverUrl = `url(${user.cover})`;
            this.profilePicUrl = `url(${user.img})`;
        });
    }
}
