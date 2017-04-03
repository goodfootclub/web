import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Team, User } from '../../types';

@Component({
  selector: 'app-teams-tile',
  templateUrl: './teams-tile.component.html',
  styleUrls: ['./teams-tile.component.styl']
})
export class TeamsTileComponent implements OnChanges {

    @Input('user')
    user: User;
    teams: Team[];
    count = 0;

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.user != null && this.user.managedTeams instanceof Array) {
            const userTeams = this.user.managedTeams;
            this.count = userTeams.length;
            this.teams = [];
            if (this.count > 2) {
                this.teams = this.user.managedTeams.splice(0, 2);
            } else {
                this.teams = this.user.managedTeams;
            }
        }
    }
}
