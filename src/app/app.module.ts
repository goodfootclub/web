import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AuthComponent, AuthService } from './auth';
import { SidenavComponent, MenuService } from './sidenav';
import { TitleService } from './title.service';
import { ProfileService } from './profile';

import { ErrorHandlingModule, FourxxErrorComponent } from './error-handling';


export const ROUTES: Routes = [{
    path: 'signup',
    component: AuthComponent,
}, {
    path: '',
    loadChildren: 'app/events/events.module#EventsModule',
    canActivate: [AuthService],
    canActivateChild: [AuthService],
}, {
    path: 'profile',
    loadChildren: 'app/profile/profile.module#ProfileModule',
    canActivate: [AuthService],
    canActivateChild: [AuthService],
}, {
    path: 'players',
    loadChildren: 'app/players/players.module#PlayersModule',
    canActivate: [AuthService],
    canActivateChild: [AuthService],
}, {
    path: 'teams',
    loadChildren: 'app/teams/teams.module#TeamsModule',
    canActivate: [AuthService],
    canActivateChild: [AuthService],
}, {
    path: '**',
    component: FourxxErrorComponent,
}];


@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        SidenavComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        RouterModule.forRoot(ROUTES),
        ErrorHandlingModule,
    ],
    providers: [
        AuthService,
        MenuService,
        ProfileService,
        SidenavComponent,
        TitleService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
