import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../core/services/menu.service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.styl'],
})
export class SidenavComponent implements OnInit {

    @Input() menu: any;

    navItems = [{
        icon: 'home',
        text: 'Home',
        path: ['/'],
    }, {
        icon: 'star',
        text: 'Profile',
        path: ['/profile'],
    }, {
        icon: 'person',
        text: 'Players',
        path: ['/players'],
    }, {
        icon: 'people',
        text: 'Teams',
        path: ['/teams'],
    }, {
        icon: 'local_parking',
        text: 'Pickup Games',
        path: ['/games'],
    }];

    constructor(private menuService: MenuService) {}

    ngOnInit() {
        this.menuService.setReference(this.menu);
    }
}
