import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvitesCountData } from '../../types';

@Component({
  selector: 'app-invites-tile',
  templateUrl: './invites-tile.component.html',
  styleUrls: ['./invites-tile.component.styl'],
})
export class InvitesTileComponent implements OnInit {

    @Input('invites')
    invites: InvitesCountData;

    constructor(private router: Router) {}

    ngOnInit() {
    }

    @HostListener('click')
    onClick() {
        this.router.navigate(['/invites']);
    }
}
