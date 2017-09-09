import { Component } from '@angular/core';
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
        private historyService: HistoryService,
    ) {}

    isHomeButtonShown(): boolean {
        return true;
    }

    isBackButtonShown(): boolean {
        return this.historyService.getHomePageIndex() > 0;
    }
}
