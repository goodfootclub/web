import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesTileComponent } from './games-tile.component';

describe('GamesTileComponent', () => {
  let component: GamesTileComponent;
  let fixture: ComponentFixture<GamesTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
