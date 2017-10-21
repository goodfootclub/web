import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { GameEditComponent } from './game-edit.component';

describe('GameEditComponent', () => {
    let component: GameEditComponent;
    let fixture: ComponentFixture<GameEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GameEditComponent],
            schemas: [ NO_ERRORS_SCHEMA ],
            imports: [ ReactiveFormsModule, RouterTestingModule ],
            // providers: [
            //     { provide: ProfileService, useClass: ProfileServiceStub },
            //     { provide: WindowRefService, useClass: WindowRefServiceStub },
            // ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GameEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
