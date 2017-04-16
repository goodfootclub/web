import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-contactus-tile',
    templateUrl: './contactus-tile.component.html',
    styleUrls: [
        './contactus-tile.component.styl',
    ],
})
export class ContactusTileComponent implements OnInit {

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }
}
