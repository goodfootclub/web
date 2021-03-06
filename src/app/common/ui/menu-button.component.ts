import { Component } from '@angular/core';
import { MenuService } from '../../core/services/menu.service';


@Component({
    selector: 'app-menu-button',
    template: `
        <button md-icon-button (click)="menu.toggle()">
            <md-icon>menu</md-icon>
        </button>
    `,
})
export class MenuButtonComponent {
    constructor(public menu: MenuService) {}
}
