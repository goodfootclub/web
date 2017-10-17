import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MyGamesTileComponent } from './my-games-tile.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GamesService } from '../../../games/games.service';
import { Observable } from 'rxjs/Observable';

describe('MyGamesTileComponent', () => {
    let component: MyGamesTileComponent;
    let fixture: ComponentFixture<MyGamesTileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyGamesTileComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [RouterTestingModule],
            providers: [
                { provide: GamesService, useClass: GamesServiceStub },
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyGamesTileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

class GamesServiceStub {
    getCurrentUserGames = () => Observable.of(null);
}
