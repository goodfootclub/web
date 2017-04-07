import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../types';

@Component({
  selector: 'app-my-teams-tile',
  templateUrl: './my-teams-tile.component.html',
  styleUrls: [
      './my-teams-tile.component.styl',
  ]
})
export class MyTeamsTileComponent implements OnInit {

    count: number;

    constructor() { }

    ngOnInit() {
    }

    @Input('user')
    set user(user: User) {
        if (!user || !(user.managedTeams instanceof Array)) {
            this.count = null;
        } else {
            this.count = user.managedTeams.length;
        }
    }

}
