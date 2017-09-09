import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material/material.module';
import { LoadMoreComponent, PlayerViewComponent } from './ui';
import { GameListComponent } from './components';
import { TextSearchPipe } from './pipes';

/**
 * Common UI directives, services, etc...
 */
@NgModule({
    imports: [
        NgCommonModule,
        RouterModule,
        MaterialModule,
    ],
    declarations: [
        LoadMoreComponent,
        PlayerViewComponent,
        TextSearchPipe,
        GameListComponent,
    ],
    exports: [
        LoadMoreComponent,
        NgCommonModule,
        PlayerViewComponent,
        TextSearchPipe,
        GameListComponent,
    ],
})
export class CommonModule { }
