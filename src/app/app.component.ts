import { Component } from '@angular/core';
import { TitleService } from './title.service';
import { StatusService } from './common/services/status.service';


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
    ) {
        title.setTitle('Your Games');
    }
}
