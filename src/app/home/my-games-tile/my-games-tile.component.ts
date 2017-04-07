import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../types';

@Component({
    selector: 'app-my-games-tile',
    templateUrl: './my-games-tile.component.html',
    styleUrls: [
        './my-games-tile.component.styl',
    ]
})
export class MyGamesTileComponent implements OnInit {

    count: number;

    constructor() { }

    ngOnInit() {
    }

    @Input('user')
    set user(user: User) {
        if (!user || !(user.games instanceof Array)) {
            this.count = null;
        } else {
            this.count = user.games.length;
        }
    }

}
