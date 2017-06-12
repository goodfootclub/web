import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ElementRef,
    Renderer,
} from '@angular/core';
import { Http } from '@angular/http';
@Component({
    selector: 'app-icon',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
    @Input()
    set name(val: string) {
        this.loadSvg(val);
    }

    constructor(private http: Http,
                private renderer: Renderer,
                private elementRef: ElementRef) {
    }

    loadSvg(val: string) {
        this.http.get(`assets/feathericons/${val}.svg`)
            .subscribe(res => {
                // get our element and clean it out
                const element = this.elementRef.nativeElement;
                element.innerHTML = '';
                const response = res.text();
                const parser = new DOMParser();
                const svg = parser.parseFromString(response, 'image/svg+xml');
                this.renderer.projectNodes(element, [svg.documentElement]);
            },
            err => {
                console.error(err);
            });
    }
}
