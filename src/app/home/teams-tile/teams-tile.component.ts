import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams-tile',
  templateUrl: './teams-tile.component.html',
  styleUrls: ['./teams-tile.component.styl'],
})
export class TeamsTileComponent implements OnInit {

    constructor(
        private router: Router,
    ) { }

    ngOnInit(): void {
    }

    @HostListener('click')
    onClick() {
        this.router.navigate(['/teams']);
    }
}
