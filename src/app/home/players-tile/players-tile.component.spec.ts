import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersTileComponent } from './players-tile.component';

describe('PlayersTileComponent', () => {
  let component: PlayersTileComponent;
  let fixture: ComponentFixture<PlayersTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
