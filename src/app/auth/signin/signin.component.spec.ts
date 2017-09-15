import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SigninComponent } from './signin.component';
import { MaterialModule } from '../../material/material.module';
import { ProfileService } from '../../profile/profile.service';
import { WindowRefService } from '../../core/services/window.service';
import { Observable } from 'rxjs/Rx';

describe('SigninComponent', () => {
    let component: SigninComponent;
    let fixture: ComponentFixture<SigninComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SigninComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            imports: [
                NoopAnimationsModule,
                MaterialModule,
                ReactiveFormsModule,
                RouterTestingModule,
            ],
            providers: [
                { provide: ProfileService, useClass: ProfileServiceStub },
                { provide: WindowRefService, useClass: WindowRefServiceStub },
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SigninComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});

class WindowRefServiceStub {}

class ProfileServiceStub {
    login(username: string, password: string) {
        return Observable.of({});
    }
}
