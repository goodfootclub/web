import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { PlayersComponent } from './players.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PlayersService } from './players.service';
import { GamesService } from '../games/games.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamsService } from '../teams/teams.service';
import { TitleService } from '../core/services/title.service';
import { Observable } from 'rxjs/Observable';

describe('Component: Players', () => {
    let component: PlayersComponent;
    let fixture: ComponentFixture<PlayersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PlayersComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            imports: [ ReactiveFormsModule, RouterTestingModule ],
            providers: [
                { provide: PlayersService, useClass: PlayersServiceStub },
                { provide: GamesService, useClass: GamesServiceStub },
                { provide: TeamsService, useClass: TeamsServiceStub },
                { provide: TitleService, useClass: TitleServiceStub },
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlayersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

class PlayersServiceStub {
    all = () => Observable.of([]);
}

class GamesServiceStub {}

class TeamsServiceStub {}

class TitleServiceStub {
    setTitle = () => {}
}
