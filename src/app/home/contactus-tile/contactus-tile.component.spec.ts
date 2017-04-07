import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusTileComponent } from './contactus-tile.component';

describe('ContactusTileComponent', () => {
  let component: ContactusTileComponent;
  let fixture: ComponentFixture<ContactusTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          ContactusTileComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactusTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
