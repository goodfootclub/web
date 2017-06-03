import { Component } from '@angular/core';
import { TitleService } from './title.service';
import { StatusService } from './common/services/status.service';
import { HistoryService } from './common/services/history.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl'],
})
export class AppComponent {
    menu: any;

    constructor(
        public title: TitleService,
        public status: StatusService,
        private historyService: HistoryService,
    ) {
        title.setTitle('Your Games');
    }
}
