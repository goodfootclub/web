import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGamesComponent } from './my-games.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GamesService } from '../games.service';
import { TitleService } from '../../core/services/title.service';
import { Observable } from 'rxjs/Observable';

describe('MyGamesComponent', () => {
    let component: MyGamesComponent;
    let fixture: ComponentFixture<MyGamesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ MyGamesComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: GamesService, useClass: GameServiceStub },
                { provide: TitleService, useClass: TitleServiceStub },
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyGamesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

class GameServiceStub {
    getCurrentUserGames = () => Observable.of({ results: [] });
}

class TitleServiceStub {
    setTitle = () => {}
}
