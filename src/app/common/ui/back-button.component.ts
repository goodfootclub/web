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
        (click)="back()" 
        [disabled]="disabled">
            <md-icon>chevron_left</md-icon>
        </button>
    `,
})
export class BackButtonComponent {

    /**
     * Depth as a minimum number of times the auth guard is
     * invoked to get to a view with the back button. For most
     * views that need a back button it's 2
     */
    @Input() depth = 2;
    @Input() disabled;

    constructor(
        @Inject(forwardRef(() => AuthService)) public auth: AuthService,
        public location: Location,
        public router: Router,
        private historyService: HistoryService,
    ) {}

    back() {
        // Check if user got there by navigating through the app or
        // by opening a link
        this.historyService.back();

        /* if (this.auth.activationsChecks > this.depth) {
            this.location.back();
        } else {
            this.router.navigate(['/']);
        } */
    }
}
