import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsTileComponent } from './teams-tile.component';

describe('TeamsTileComponent', () => {
  let component: TeamsTileComponent;
  let fixture: ComponentFixture<TeamsTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
