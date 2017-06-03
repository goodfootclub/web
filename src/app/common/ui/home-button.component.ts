import { Component } from '@angular/core';


@Component({
    selector: 'app-home-button',
    template: `
        <button md-icon-button [routerLink]="['/']">
            <md-icon>home</md-icon>
        </button>
    `,
})
export class HomeButtonComponent {
    constructor() {}
}
