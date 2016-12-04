import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { TitleService } from './title.service';
import { SidenavComponent } from './sidenav/sidenav.component';

export const ROUTES: Routes = [
    {
        path: '',
        children: [],
    },
];


@NgModule({
    declarations: [
        AppComponent,
        SidenavComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        RouterModule.forRoot(ROUTES),
    ],
    providers: [
        TitleService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
