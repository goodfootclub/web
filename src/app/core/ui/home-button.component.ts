import { Component } from '@angular/core';


@Component({
    selector: 'app-home-button',
    template: `
        <button md-icon-button [routerLink]="['/']">
            <app-icon name="home"></app-icon>
        </button>
    `,
})
export class HomeButtonComponent {
    constructor() {}
}
