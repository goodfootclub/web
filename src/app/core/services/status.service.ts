import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeWhile';

@Injectable()
export class StatusService {

    private _requestCounter = 0;
    private handler: LoadingHandler = new LoadingHandler();

    observeLoading = this.handler.loadingSubject.asObservable();

    constructor() {}

    startRequesting(): void {
        this.requestCounter++;
    }

    stopRequesting(): void {
        this.requestCounter--;
    }

    get requestCounter(): number {
        return this._requestCounter;
    }

    set requestCounter(value: number) {
        this._requestCounter = value;
        this.handler.event(this._requestCounter !== -1);
    }
}

class LoadingHandler {

    public loadingSubject = new BehaviorSubject<any>(false);
    isLoading = false;
    skipTimer = false;

    event(loadingFlag: boolean) {
        if (loadingFlag !== this.isLoading) {
            this.isLoading = loadingFlag;
            this.loadingSubject.next(loadingFlag);
            if (!loadingFlag) {
                this.skipTimer = true;
            } else {
                this.initTimer();
            }
        }
    }

    /* to skip timerf if loading is too long */
    initTimer() {
        Observable.timer(3000)
            .take(1)
            .takeWhile(() => !this.skipTimer)
            .subscribe(() => {
                this.loadingSubject.next(false)
            });
    }
}
