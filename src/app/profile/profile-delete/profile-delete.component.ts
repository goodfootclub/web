import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TitleService } from '../../core/services/title.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrls: ['./profile-delete.component.styl'],
})
export class ProfileDeleteComponent implements OnInit {

  constructor(
      private profileService: ProfileService,
      private router: Router,
      private title: TitleService,
  ) { }

  ngOnInit() {
      this.title.setTitle('Profile');
  }

  yes() {
      this.profileService.delete()
          .subscribe(() => {
              this.profileService.logoutOnFrontEnd();
              this.router.navigate(['/']);
          });
  }

  no() {
      this.router.navigate(['/profile']);
  }
}
