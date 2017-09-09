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
import {HomeComponent} from './home/home.component';
import {HomeModule} from './home/home.module';

export const ROUTES: Routes = [{
    path: '',
    // component: HomeComponent
    loadChildren: 'app/home/home.module#HomeModule',
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
        CoreModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot(ROUTES),
        ErrorHandlingModule,
        MaterialModule,
        // HomeModule,
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
