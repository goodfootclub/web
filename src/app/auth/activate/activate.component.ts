import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WindowRefService } from '../../core/services/window.service';
import { ProfileService } from '../../profile/profile.service';

@Component({
    selector: 'app-activate',
    templateUrl: './activate.component.html',
    styleUrls: ['./activate.component.styl'],
})
export class ActivateComponent implements OnInit {

    constructor(
        private windowRef: WindowRefService,
        private router: Router,
        private profileService: ProfileService,
        private route: ActivatedRoute,
    ) {
        this.windowRef.setFullScreen(true);
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['uid'] && params['token']) {
                this.profileService.activate(params['uid'], params['token'])
                    .subscribe(() => {
                        this.router.navigate(['/']);
                });
            } else {
                this.router.navigate(['/']);
            }
        });
    }
}
