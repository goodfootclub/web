import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../types';

@Component({
    selector: 'app-teams-list',
    templateUrl: './teams-list.component.html',
    styleUrls: ['./teams-list.component.styl'],
})
export class TeamsListComponent implements OnInit {

    @Input('teams')
    teams: Team[];

    roleNames = {
        [3]: 'Captain',
        [2]: 'Player',
        [1]: 'Substitute',
        [0]: 'Inactive',
        [-1]: 'Invited',
        [-2]: 'Asked to join',
    };

    constructor() {}

    ngOnInit() {}
}
