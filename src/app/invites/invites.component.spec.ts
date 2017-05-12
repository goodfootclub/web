import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { InvitesComponent } from './invites.component';
import { MenuButtonComponent } from '../common/ui/menu-button.component';
import { TitleComponent } from '../common/ui/title.component';
import { TeamInvitesComponent } from './team-invites/team-invites.component';
import {
    GameListComponent,
} from '../common/components/games-list/game-list.component';
import { ProfileService } from '../profile/profile.service';
import { GamesService } from '../games/games.service';
import { TeamsService } from '../teams/teams.service';
import { TitleService } from '../title.service';
import { MenuService } from '../common/services/menu.service';
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
            ],
            providers: [
                { provide: ProfileService, useClass: ProfileServiceStub },
                { provide: GamesService, useClass: GamesServiceStub },
                { provide: TeamsService, useClass: TeamsServiceStub },
                { provide: TitleService, useClass: TitleServiceStub },
                { provide: MenuService, useClass: MenuServiceStub },
            ],
            imports: [
                MaterialModule,
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
