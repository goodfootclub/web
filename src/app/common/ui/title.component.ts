import {
    Component,
    Input,
    Inject,
    OnChanges,
    forwardRef,
} from '@angular/core';

import { TitleService } from 'app';


@Component({
    selector: 'app-title',
    template: `{{ title.observable | async }}`,
})
export class TitleComponent implements OnChanges {

    @Input() value: string;

    constructor(
        @Inject(forwardRef(() => TitleService)) public title: TitleService,
    ) {}

    ngOnChanges() {
        if (this.value != null) {
            this.title.setTitle(this.value);
        }
    }
}
