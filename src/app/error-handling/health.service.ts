import { Injectable } from '@angular/core';


export enum HealthStatus {
    Healthy,
    Critical,
}

@Injectable()
export class HealthService {

    errorMessage: string;
    status = HealthStatus.Healthy;

    constructor() {

    }

    criticalError(errorMessage = '') {
        this.status = HealthStatus.Critical;
        this.errorMessage = errorMessage;
    }
}
