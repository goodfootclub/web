import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleService } from '../../core/services/title.service';
import { HistoryService } from '../../core/services/history.service';
import { ProfileService } from '../profile.service';

describe('ChangePasswordComponent', () => {
    let component: ChangePasswordComponent;
    let fixture: ComponentFixture<ChangePasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChangePasswordComponent],
            imports: [ReactiveFormsModule],
            providers: [
                { provide: TitleService, useClass: TitleServiceStub },
                { provide: HistoryService, useClass: HistoryServiceStub },
                { provide: ProfileService, useClass: ProfileServiceStub },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

class TitleServiceStub {
    setTitle = () => {};
}

class HistoryServiceStub {}

class ProfileServiceStub {}
