import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTileComponent } from './profile-tile.component';

describe('ProfileTileComponent', () => {
  let component: ProfileTileComponent;
  let fixture: ComponentFixture<ProfileTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
