import { NgModule } from '@angular/core';
import { AppCommonModule } from 'app/common';
import { CriticalErrorComponent } from './critical-error.component';
import { FourxxErrorComponent } from './4xx-error.component';
import { HttpErrorHandler } from './http-error.service';


@NgModule({
    imports: [
        AppCommonModule,
    ],
    declarations: [
        CriticalErrorComponent,
        FourxxErrorComponent,
    ],
    providers: [
        HttpErrorHandler,
    ],
    exports: [
        CriticalErrorComponent,
        FourxxErrorComponent,
    ],
})
export class ErrorHandlingModule { }

export { FourxxErrorComponent };
