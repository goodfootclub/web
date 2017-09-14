import { Component, OnInit, HostListener } from '@angular/core';
import { WindowRefService } from '../../../core/services/window.service';


@Component({
    selector: 'app-contactus-tile',
    templateUrl: './contactus-tile.component.html',
    styleUrls: [
        './contactus-tile.component.styl',
    ],
})
export class ContactusTileComponent implements OnInit {

    constructor(
        private windowRef: WindowRefService,
    ) { }

    ngOnInit() {
    }

    @HostListener('click')
    onClick() {
        this.windowRef.window.location.href =
            'https://facebook.com/goodfootclub';
    }
}
