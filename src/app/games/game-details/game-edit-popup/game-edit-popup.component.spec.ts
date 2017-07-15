import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameEditPopupComponent } from './game-edit-popup.component';

describe('GameEditPopupComponent', () => {
  let component: GameEditPopupComponent;
  let fixture: ComponentFixture<GameEditPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameEditPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
