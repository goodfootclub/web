import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';


@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {

    constructor(public title: TitleService) {
        title.setTitle('Teams');
    }

    ngOnInit() {
    }

}
