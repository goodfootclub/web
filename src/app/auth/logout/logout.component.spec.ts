import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import { WindowRefService } from '../../common/services/window.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('LogoutComponent', () => {
    let component: LogoutComponent;
    let fixture: ComponentFixture<LogoutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LogoutComponent],
            imports: [
                RouterTestingModule,
            ],
            providers: [
                { provide: WindowRefService, useClass: WindowRefServiceStub },
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LogoutComponent);
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
