import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from 'app/common';


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
    }];

    constructor(private menuService: MenuService) {}

    ngOnInit() {
        this.menuService.setReference(this.menu);
    }
}
