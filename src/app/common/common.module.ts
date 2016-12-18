import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { CommonModule as NgCommonModule } from '@angular/common';
import { PlayerViewComponent, MenuButtonComponent } from './ui';

/**
 * Common UI directives, services, etc...
 */
@NgModule({
    imports: [
        MaterialModule,
        NgCommonModule,
    ],
    declarations: [
        MenuButtonComponent,
        PlayerViewComponent,
    ],
    exports: [
        MaterialModule,
        MenuButtonComponent,
        NgCommonModule,
        PlayerViewComponent,
    ],
})
export class CommonModule { }
