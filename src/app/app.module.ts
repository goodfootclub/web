import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { ToastyModule } from 'ng2-toasty';

import { AppComponent } from './app.component';
import { AuthComponent, AuthService } from './auth';
import {
    MenuService,
    HttpProvider,
    StatusService,
    HistoryService,
    AnalyticsService,
} from './common';
import { ProfileService } from './profile';
import { SidenavComponent } from './sidenav';
import { TitleService } from './title.service';
import { ErrorHandlingModule, FourxxErrorComponent } from './error-handling';
import { WindowRefService } from './common/services/window.service';

export const ROUTES: Routes = [{
    path: 'signup',
    component: AuthComponent,
}, {
    path: '',
    loadChildren: 'app/home/home.module#HomeModule',
    canActivateChild: [AuthService],
    canActivate: [AuthService],
}, {
    path: 'profile',
    loadChildren: 'app/profile/profile.module#ProfileModule',
    canActivate: [AuthService],
    canActivateChild: [AuthService],
}, {
    path: 'invites',
    loadChildren: 'app/invites/invites.module#InvitesModule',
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
    path: 'games',
    loadChildren: 'app/games/games.module#GamesModule',
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
        ToastyModule.forRoot(),
        RouterModule.forRoot(ROUTES),
        ErrorHandlingModule,
    ],
    providers: [
        HttpProvider,
        StatusService,
        AuthService,
        MenuService,
        HistoryService,
        ProfileService,
        AnalyticsService,
        SidenavComponent,
        TitleService,
        WindowRefService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
