import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile/profile.service';
import { User } from '../../types';

@Component({
  selector: 'app-profile-tile',
  templateUrl: './profile-tile.component.html',
  styleUrls: [
      './profile-tile.component.styl',
  ]
})
export class ProfileTileComponent implements OnInit {

    user: User;
    profilePicUrl: string;

    constructor(
        private profile: ProfileService,
    ) { }

    ngOnInit() {
        this.profile.getCurrentUser().subscribe(user => {
            this.user = user;
            if (this.user == null) {
                return;
            }
            this.profilePicUrl = `url(${this.user.img})`;
        });
    }
}
