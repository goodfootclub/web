import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { TeamInvitesComponent } from './team-invites.component';

describe('TeamInvitesComponent', () => {
    let component: TeamInvitesComponent;
    let fixture: ComponentFixture<TeamInvitesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TeamInvitesComponent ],
            imports: [ RouterModule ],
        })
        .compileComponents();
    }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
