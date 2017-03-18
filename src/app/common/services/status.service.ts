import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StatusService {

    requestingCounter = 0;
    loading = new BehaviorSubject<any>(false);
    observeLoading = this.loading.asObservable();

    constructor() {}

    startRequesting(): void {
        this.loading.next(true);
        this.requestingCounter++;
    }

    stopRequesting(): void {
        this.loading.next(false);
        this.requestingCounter--;
    }
}
