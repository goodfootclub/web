import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsService } from '../../teams/teams.service';


@Component({
    selector: 'app-my-teams-tile',
    templateUrl: './my-teams-tile.component.html',
    styleUrls: [
        './my-teams-tile.component.styl',
    ],
})
export class MyTeamsTileComponent implements OnInit {

    count = 0;
    loading = true;

    constructor(
        private teamsService: TeamsService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.teamsService.getCurrentUserTeams(1).subscribe(res => {
            this.loading = false;
            if (res != null) {
                this.count = res.count;
            } else {
                this.count = 0;
            }
        });
    }

    @HostListener('click')
    onClick() {
        if (!this.loading) {
            if (this.count > 0) {
                this.router.navigate(['/teams/my']);
            } else {
                this.router.navigate(['/teams']);
            }
        }
    }
}
