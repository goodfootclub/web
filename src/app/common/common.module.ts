import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { PlayerViewComponent } from './ui';


/**
 * Common UI directives, services, etc...
 */
@NgModule({
    imports: [
        NgCommonModule,
    ],
    declarations: [
        PlayerViewComponent,
    ],
    exports: [
        NgCommonModule,
        PlayerViewComponent,
    ],
})
export class CommonModule { }
