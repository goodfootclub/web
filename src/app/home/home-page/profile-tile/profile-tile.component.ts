import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../../profile/profile.service';
import { User } from '../../../types';

@Component({
  selector: 'app-profile-tile',
  templateUrl: './profile-tile.component.html',
  styleUrls: ['./profile-tile.component.styl'],
})
export class ProfileTileComponent implements OnChanges {

    @Input('user')
    user: User;

    profilePicUrl: string;

    constructor(
        private profile: ProfileService,
        private router: Router,
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.user != null) {
            this.profilePicUrl = `url(${this.user.img})`;
        }
    }

    @HostListener('click')
    onClick() {
        this.router.navigate(['/profile']);
    }
}
