import { Component } from '@angular/core';
import { HistoryService } from '../../core/services/history.service';

@Component({
    selector: 'app-back-button',
    template: `
        <button type="button"
        md-icon-button
        (click)="back()">
            <app-icon name="chevron-left"></app-icon>
        </button>
    `,
})
export class BackButtonComponent {

    constructor(
        private historyService: HistoryService,
    ) {}

    back() {
        this.historyService.back();
    }
}
