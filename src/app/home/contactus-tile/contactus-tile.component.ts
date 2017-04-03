import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactus-tile',
  templateUrl: './contactus-tile.component.html',
  styleUrls: ['./contactus-tile.component.styl']
})
export class ContactusTileComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    sendMail() {
        // TODO mailTo:team@goodfoot.club
    }
}
