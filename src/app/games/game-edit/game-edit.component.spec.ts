import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { GameEditComponent } from './game-edit.component';
import { MaterialModule } from '../../material/material.module';
import { LocationsService } from '../locations.service';
import { ProfileService } from '../../profile/profile.service';
import { GamesService } from '../games.service';
import { HistoryService } from '../../core/services/history.service';
import { Observable } from 'rxjs/Observable';
import { GameEvent, User } from '../../types';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('GameEditComponent', () => {
    let component: GameEditComponent;
    let fixture: ComponentFixture<GameEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GameEditComponent],
            schemas: [ NO_ERRORS_SCHEMA ],
            imports: [ ReactiveFormsModule,
                RouterTestingModule,
                MaterialModule,
                NoopAnimationsModule,
            ],
            providers: [
                { provide: LocationsService, useClass: LocationsServiceStub },
                { provide: ProfileService, useClass: ProfileServiceStub },
                { provide: GamesService, useClass: GamesServiceStub },
                { provide: HistoryService, useClass: HistoryServiceStub },
            ],
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

class LocationsServiceStub {
    all = () => Observable.of([]);
}

class ProfileServiceStub {
    getCurrentUser = () => Observable.of(new User({}));
}

class GamesServiceStub {
    get = () => Observable.of(new GameEvent({}));
}

class HistoryServiceStub {}
