import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StatusService } from '../services/status.service';

@Component({
    selector: 'app-load-more-block',
    template: `
        <div class="load-more-container" *ngIf="canLoadMore">
            <md-card class="clickable"
            (click)="loadMore()"
            *ngIf="!(status.observeLoading | async)">
                <div class="load-more">
                    <span>Load more</span>
                </div>
            </md-card>
            <md-card *ngIf="status.observeLoading | async">
                <div class="load-more">
                    <span>Loading ...</span>
                </div>
            </md-card>
        </div>
    `,
    styleUrls: ['load-more.component.styl'],
})
export class LoadMoreComponent {

    @Input() canLoadMore = true;
    @Output() loadMoreCallback: EventEmitter<any> = new EventEmitter();

    constructor(
        public status: StatusService,
    ) {}

    loadMore() {
        this.loadMoreCallback.emit();
    }
}
