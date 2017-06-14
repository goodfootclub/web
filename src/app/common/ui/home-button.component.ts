import { Component } from '@angular/core';


@Component({
    selector: 'app-home-button',
    template: `
        <button md-icon-button [routerLink]="['/']">
            <!--md-icon>home</md-icon-->
            <md-icon><app-icon name="home"></app-icon></md-icon>
        </button>
    `,
})
export class HomeButtonComponent {
    constructor() {}
}
