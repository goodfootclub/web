import { Component, OnInit } from '@angular/core';
import { TitleService } from 'app/title.service';


@Component({
    selector: 'app-games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {

    constructor(public title: TitleService) {
        title.setTitle('Find a game');
    }

    ngOnInit() {
    }
}
