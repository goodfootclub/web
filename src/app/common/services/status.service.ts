import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StatusService {

    private _requestingCounter = 0;
    loading = new BehaviorSubject<any>(false);
    observeLoading = this.loading.asObservable();

    constructor() {}

    startRequesting(): void {
        this.requestingCounter++;
    }

    stopRequesting(): void {
        this.requestingCounter--;
    }

    get requestingCounter(): number {
        return this._requestingCounter;
    }

    set requestingCounter(value: number) {
        this._requestingCounter = value;
        this.loading.next(this._requestingCounter !== 0);
    }
}
