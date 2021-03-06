import {
    Component,
    Input,
    Inject,
    OnChanges,
    forwardRef,
} from '@angular/core';
import { TitleService } from '../../core/services/title.service';

@Component({
    selector: 'app-title',
    template: `{{ title.observable | async }}`,
})
export class TitleComponent implements OnChanges {

    @Input() value: string;

    constructor(
        @Inject(forwardRef(() => TitleService)) public title: TitleService,
    ) {}

    ngOnChanges(param: any) {
        if (this.value != null) {
            this.title.setTitle(this.value);
        }
    }
}
