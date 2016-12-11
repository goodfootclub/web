import { Component } from '@angular/core';
import { TitleService } from './title.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl'],
})
export class AppComponent {
    closeMenuButton: any;
    menu: any;

    constructor(public title: TitleService) {
        title.setTitle('Your Games');
    }
}
