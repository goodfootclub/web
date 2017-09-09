import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

import { InvitesComponent } from './invites.component';
import { MenuButtonComponent } from '../core/ui/menu-button.component';
import { TitleComponent } from '../core/ui/title.component';
import { TeamInvitesComponent } from './team-invites/team-invites.component';
import {
    GameListComponent,
} from '../common/components/games-list/game-list.component';
import {
    NavigationButtonsComponent,
} from '../core/ui/navigation-buttons.component';
import { HomeButtonComponent } from '../core/ui/home-button.component';
import { BackButtonComponent } from '../core/ui/back-button.component';
import { ProfileService } from '../profile/profile.service';
import { InvitesService } from './invites.service';
import { GamesService } from '../games/games.service';
import { TeamsService } from '../teams/teams.service';
import { TitleService } from '../core/services/title.service';
import { MenuService } from '../core/services/menu.service';
import { HistoryService } from '../core/services/history.service';
import { User } from '../types';
import { Observable } from 'rxjs/Observable';

describe('InvitesComponent', () => {
    let component: InvitesComponent;
    let fixture: ComponentFixture<InvitesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                InvitesComponent,
                MenuButtonComponent,
                TitleComponent,
                TeamInvitesComponent,
                GameListComponent,
                NavigationButtonsComponent,
                HomeButtonComponent,
                BackButtonComponent,
            ],
            providers: [
                { provide: ProfileService, useClass: ProfileServiceStub },
                { provide: InvitesService, useClass: InvitesServiceStub },
                { provide: GamesService, useClass: GamesServiceStub },
                { provide: TeamsService, useClass: TeamsServiceStub },
                { provide: TitleService, useClass: TitleServiceStub },
                { provide: MenuService, useClass: MenuServiceStub },
                { provide: HistoryService, useClass: HistoryServiceStub },
                { provide: Router, useClass: RouterStub },
                { provide: ActivatedRoute, useClass: ActivatedRouteStub },
            ],
            imports: [
                RouterModule,
            ],
        })
        .compileComponents();
    }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class ProfileServiceStub {
    getCurrentUser() {
        return Observable.of(new User({}));
    }
}

class InvitesServiceStub {
    getCurrentUserTeamInvites() {
        return Observable.of({});
    }
    getCurrentUserGameInvites() {
        return Observable.of({});
    }
}

class GamesServiceStub {
}

class TeamsServiceStub {
}

class TitleServiceStub {
    setTitle() {}
}

class MenuServiceStub {
}

class HistoryServiceStub {
    getHomePageIndex() { return 1; }
}

class RouterStub {
}

class ActivatedRouteStub {
}
