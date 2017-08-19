import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from '../../../games/games.service';


@Component({
    selector: 'app-my-games-tile',
    templateUrl: './my-games-tile.component.html',
    styleUrls: [
        './my-games-tile.component.styl',
    ],
})
export class MyGamesTileComponent implements OnInit {

    loading = true;
    count = 0;

    constructor(
        private gamesService: GamesService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.gamesService.getCurrentUserGames(1).subscribe(res => {
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
                this.router.navigate(['/games/my']);
            } else {
                this.router.navigate(['/games']);
            }
        }
    }
}
