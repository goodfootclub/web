import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from 'app/profile';


@Component({
    selector: 'app-my-teams-tile',
    templateUrl: './my-teams-tile.component.html',
    styleUrls: [
        './my-teams-tile.component.styl',
    ],
})
export class MyTeamsTileComponent implements OnInit {

    count: number;

    constructor(private profile: ProfileService) { }

    ngOnInit() {
        this.profile.getCurrentUserTeams(1).subscribe(res => {
            if (res != null) {
                this.count = res.count;
            } else {
                this.count = 0;
            }
        });
    }
}
