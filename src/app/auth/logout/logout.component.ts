import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { WindowRefService } from '../../common/services/window.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.styl'],
})
export class LogoutComponent implements OnInit {

  constructor(
      private windowRef: WindowRefService,
      private router: Router,
  ) {
      this.windowRef.setFullScreen(true);
  }

  ngOnInit() {
      Observable.timer(3000).subscribe(() => this.router.navigate(['/']));
  }
}
