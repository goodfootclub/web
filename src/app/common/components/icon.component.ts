import {
    Component,
    Input,
    ChangeDetectionStrategy,
} from '@angular/core';

@Component({
    selector: 'app-icon',
    template: `<md-icon><img [src]="fullName" [alt]="alt"/></md-icon>`,
    styles: [`
        :host {
            display: block;
        }
        md-icon {
            vertical-align: middle;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {

    @Input()
    set name(val: string) {
        this.fullName = `assets/feathericons/${val}.svg`;
    }

    @Input()
    alt: string;

    fullName: string;

    constructor() {}
}
