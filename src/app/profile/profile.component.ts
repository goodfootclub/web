import { Component } from '@angular/core';
import { TitleService } from 'app/title.service';
import { ProfileService } from './profile.service';
import { User } from 'app/types';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.styl'],
})
export class ProfileComponent {

    user: User;
    coverUrl: string;
    profilePicUrl: string;

    constructor(title: TitleService, public profile: ProfileService) {
        title.setTitle('Profile');
        profile.getCurrentUser().subscribe(user => {
            this.user = user;
            if (user.cover == null) {
                user.cover = 'https://placekitten.com/600/300';
            }
            if (user.img == null) {
                user.img = 'https://placekitten.com/150/150';
            }
            this.coverUrl = `url(${user.cover})`;
            this.profilePicUrl = `url(${user.img})`;
        });
    }
}
