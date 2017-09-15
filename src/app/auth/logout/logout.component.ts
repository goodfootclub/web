import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { WindowRefService } from '../../core/services/window.service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.styl'],
})
export class LogoutComponent implements OnInit {

    time = 3;

    constructor(
        private windowRef: WindowRefService,
        private router: Router,
    ) {
        this.windowRef.setFullScreen(true);
    }

    ngOnInit() {
        Observable.timer(1000, 1000)
            .timeInterval()
            .take(3)
            .subscribe(() => {
                this.time = this.time - 1;
                if (this.time === 0) {
                    this.router.navigate(['/']);
                }
            });
    }
}
