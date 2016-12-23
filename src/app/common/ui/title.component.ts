import { Component, Inject, forwardRef } from '@angular/core';

import { TitleService } from 'app';


@Component({
    selector: 'app-title',
    template: `{{ title.observable | async }}`,
})
export class TitleComponent {

    constructor(
        @Inject(forwardRef(() => TitleService)) public title: TitleService,
    ) {}
}
