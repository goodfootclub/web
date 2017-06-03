import { Component, Input, Inject, forwardRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth';
import { HistoryService } from '../services/history.service';

@Component({
    selector: 'app-back-button',
    template: `
        <button type="button" 
        md-icon-button 
        (click)="back()">
            <md-icon>chevron_left</md-icon>
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
