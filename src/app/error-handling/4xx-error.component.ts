import { Component } from '@angular/core';


let yellowCard = require('./img/yellow-card.jpg');

@Component({
    selector: 'fourxx-error-page',
    templateUrl: './error-page.html',
    styleUrls: ['./error-page.styl'],
})
export class FourxxErrorComponent {

    bgImg = `url('${ yellowCard }')`;
    extraInfo = false;
    messageA = 'Bad url. If there ever was something, it\'s gone';
    messageB = false;
    title = 'PAGE NOT FOUND';
    constructor() { }
}
