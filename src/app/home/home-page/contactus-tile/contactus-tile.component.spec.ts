import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusTileComponent } from './contactus-tile.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { WindowRefService } from '../../../core/services/window.service';

describe('ContactusTileComponent', () => {
    let component: ContactusTileComponent;
    let fixture: ComponentFixture<ContactusTileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ContactusTileComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: WindowRefService, useClass: WindowRefServiceStub },
            ],
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

class WindowRefServiceStub {}
