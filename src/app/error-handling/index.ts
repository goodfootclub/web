import { NgModule } from '@angular/core';
import { CommonModule } from 'app/common';
import { CriticalErrorComponent } from './critical-error.component';
import { FourxxErrorComponent } from './4xx-error.component';
import { HealthService } from './health.service';


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        CriticalErrorComponent,
        FourxxErrorComponent,
    ],
    providers: [
        HealthService,
    ],
    exports: [
        CriticalErrorComponent,
        FourxxErrorComponent,
    ],
})
export class ErrorHandlingModule { }

export { HealthService, HealthStatus } from './health.service';
export { FourxxErrorComponent };
