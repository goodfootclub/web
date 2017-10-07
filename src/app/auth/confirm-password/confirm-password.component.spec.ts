import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ConfirmPasswordComponent } from './confirm-password.component';
import { ProfileService } from '../../profile/profile.service';
import { WindowRefService } from '../../core/services/window.service';

describe('ConfirmPasswordComponent', () => {
    let component: ConfirmPasswordComponent;
    let fixture: ComponentFixture<ConfirmPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ConfirmPasswordComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            imports: [ ReactiveFormsModule, RouterTestingModule ],
            providers: [
                { provide: ProfileService, useClass: ProfileServiceStub },
                { provide: WindowRefService, useClass: WindowRefServiceStub },
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

class ProfileServiceStub {}

class WindowRefServiceStub {
    setFullScreen() {}
}
