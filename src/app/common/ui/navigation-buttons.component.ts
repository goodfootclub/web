import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { HistoryService } from '../services/history.service';


@Component({
    selector: 'app-navigation',
    template: `
        <app-home-button *ngIf="isHomeButtonShown()"></app-home-button>
        <app-back-button *ngIf="isBackButtonShown()"></app-back-button>
    `,
})
export class NavigationButtonsComponent {
    constructor(
        private location: Location,
        private historyService: HistoryService,
    ) {}

    isHomeButtonShown(): boolean {
        // return this.historyService.getHomePageIndex() !== 0
        //     && '/' !== this.location.path();
        return true;
    }

    isBackButtonShown(): boolean {
        console.log(this.historyService.getHomePageIndex());
        return this.historyService.getHomePageIndex() > 0;
    }
}
