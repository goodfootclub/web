import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivateComponent } from './activate.component';
import { WindowRefService } from '../../common/services/window.service';
import { ProfileService } from '../../profile/profile.service';
import { Observable } from 'rxjs/Rx';

describe('ActivateComponent', () => {
    let component: ActivateComponent;
    let fixture: ComponentFixture<ActivateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ActivateComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            imports: [
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
        fixture = TestBed.createComponent(ActivateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});

class WindowRefServiceStub {
    setFullScreen(flag) {}
}

class ProfileServiceStub {
    activate(uid: string, token: string) {
        return Observable.of({});
    }
}
