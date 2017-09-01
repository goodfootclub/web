import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material/material.module';

import { JoinComponent } from './join.component';
import { ProfileService } from '../../profile/profile.service';
import { Observable } from 'rxjs/Rx';

describe('JoinComponent', () => {
    let component: JoinComponent;
    let fixture: ComponentFixture<JoinComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ JoinComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            imports: [
                NoopAnimationsModule,
                MaterialModule,
                ReactiveFormsModule,
                RouterTestingModule,
            ],
            providers: [
                { provide: ProfileService, useClass: ProfileServiceStub },
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JoinComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});

class ProfileServiceStub {
    register(email: string, username: string, password: string) {
        return Observable.of({});
    }
}
