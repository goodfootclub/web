import { Component } from '@angular/core';
import { TitleService } from './title.service';
// import { HealthService, HealthStatus } from './error-handling';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl'],
})
export class AppComponent {
    menu: any;

    // CRITICAL = HealthStatus.Critical;

    constructor(
        public title: TitleService,
        // public health: HealthService,
    ) {
        title.setTitle('Your Games');
    }
}
