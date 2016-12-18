import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { CommonModule as NgCommonModule } from '@angular/common';
import { PlayerViewComponent, MenuButtonComponent } from './ui';
import { TextSearchPipe } from './pipes';


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
        TextSearchPipe,
    ],
    exports: [
        MaterialModule,
        MenuButtonComponent,
        NgCommonModule,
        PlayerViewComponent,
        TextSearchPipe,
    ],
})
export class CommonModule { }
