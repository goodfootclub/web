import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ErrorHandlerFactory } from './error-handling/raven.service';
import { ToastyModule } from 'ng2-toasty';
import { AppComponent } from './app.component';
import { AuthService } from './auth';
import { ProfileService } from './profile';
import { SidenavComponent } from './sidenav';
import { ErrorHandlingModule, FourxxErrorComponent } from './error-handling';
import { CoreModule } from './core/core.module';
import { AppCommonModule } from './common/common.module';

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
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppCommonModule,
        CoreModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot(ROUTES),
        ErrorHandlingModule,
        MaterialModule,
    ],
    providers: [
        { provide: ErrorHandler, useFactory: ErrorHandlerFactory },
        AuthService,
        ProfileService,
        SidenavComponent,
    ],
    declarations: [
        AppComponent,
        SidenavComponent,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
