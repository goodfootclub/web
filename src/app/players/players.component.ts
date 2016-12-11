import { Component, OnInit } from '@angular/core';
import { TitleService } from 'app/title.service';
import { PlayersService } from './players.service';



@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.css'],
})
export class PlayersComponent implements OnInit {

    constructor(public players: PlayersService,
                public title: TitleService) {
        title.setTitle('Players');
    }

    ngOnInit() {

    }
}
