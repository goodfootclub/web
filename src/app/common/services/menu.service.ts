import { Injectable } from '@angular/core';


/**
 * Service to keep the reference to the md-sidenav component
 */
@Injectable()
export class MenuService {

    menu: any;

    // Reference is set by SidenavComponent
    setReference(menu: any) {
        this.menu = menu;
    }

    close() {
        this.menu.close();
    }

    open() {
        this.menu.open();
    }

    toggle() {
        this.menu.toggle();
    }
}
