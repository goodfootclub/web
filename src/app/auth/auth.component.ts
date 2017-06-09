import { Component } from '@angular/core';
import { WindowRefService } from '../common/services/window.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.styl'],
})
export class AuthComponent {

    constructor(private windowRef: WindowRefService) { }

    useFacebook() {
        this.windowRef.window.location.href =
            '/auth/login/facebook';
    }
}
