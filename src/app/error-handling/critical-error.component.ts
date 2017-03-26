import { Component } from '@angular/core';

let injuryImg = require('./img/injury.jpg');

@Component({
    selector: 'app-critical-error-page',
    templateUrl: './error-page.html',
    styleUrls: ['./error-page.styl'],
})
export class CriticalErrorComponent {

    extraInfo = 'No details regarding this error ¯\\_(ツ)_/¯';
    bgImg = `url('${ injuryImg }')`;
    messageA = 'Looks like there is a serious problem on our end';
    messageB = 'Doing our best to fix it ASAP. Sit tight!';
    title = 'SERVER IS DOWN';

    constructor() { }
}
