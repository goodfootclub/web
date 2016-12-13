import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';


/**
 * App bar and document title value
 */
@Injectable()
export class TitleService {

    observable: Observable<string>;
    value: string = '';

    private _subs: Subscriber<string>[] = [];

    constructor(public domTitle: Title) {

        const subscribe = (subscriber: Subscriber<string>) => {
            this._subs.push(subscriber);
            subscriber.next(this.value);
            return () => {
                this._subs.splice(this._subs.indexOf(subscriber), 1);
            };
        };

        this.observable = new Observable<string>(subscribe);
    }

    setTitle(title: string) {
        this.domTitle.setTitle(title + ' — Good Foot Club');
        this.value = title;
        for (let sub of this._subs) {
            sub.next(title);
        }
    }

}
