import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandlerFactory } from './error-handling/raven.service';
import { ToastyModule } from 'ng2-toasty';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { AuthService } from './common/services/auth.service';
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
    path: '',
    loadChildren: 'app/home/home.module#HomeModule',
}, {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule',
    // canActivate: [AuthService], // TODO disable if logged in!
    // canActivateChild: [AuthService],
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
        SidenavComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot(ROUTES),
        ErrorHandlingModule,
    ],
    providers: [
        { provide: ErrorHandler, useFactory: ErrorHandlerFactory },
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
export class AppModule {
}
