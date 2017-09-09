import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StatusService {

    private _requestCounter = 0;
    loading = new BehaviorSubject<any>(false);
    observeLoading = this.loading.asObservable();

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
        this.loading.next(this._requestCounter !== 0);
    }
}
