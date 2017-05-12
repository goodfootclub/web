import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitesTileComponent } from './invites-tile.component';

describe('InvitesTileComponent', () => {
  let component: InvitesTileComponent;
  let fixture: ComponentFixture<InvitesTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitesTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitesTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
