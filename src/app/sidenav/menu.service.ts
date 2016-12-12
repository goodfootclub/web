import { Injectable } from '@angular/core';


/**
 * Service to hold reference to the sidemenu component
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
