import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.styl'],
})
export class SidenavComponent {

    @Input() menu: any;

    navItems = [{
        icon: 'home',
        text: 'Home',
        path: [''],
    }, {
        icon: 'star',
        text: 'Profile',
        path: ['profile'],
    }, {
        icon: 'person',
        text: 'Players',
        path: ['players'],
    }, {
        icon: 'people',
        text: 'Teams',
        path: ['teams'],
    }];

    constructor() { }
}
