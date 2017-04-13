import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from 'app/profile';


@Component({
    selector: 'app-my-games-tile',
    templateUrl: './my-games-tile.component.html',
    styleUrls: [
        './my-games-tile.component.styl',
    ],
})
export class MyGamesTileComponent implements OnInit {

    count: number;

    constructor(private profile: ProfileService) { }

    ngOnInit() {
        this.profile.getCurrentUserGames(1).subscribe(res => {
            if (res != null) {
                this.count = res.count;
            } else {
                this.count = 0;
            }
        });
    }
}
