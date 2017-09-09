import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TeamsListComponent } from './teams-list.component';

describe('TeamsListComponent', () => {
    let component: TeamsListComponent;
    let fixture: ComponentFixture<TeamsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TeamsListComponent ],
            imports: [
                RouterModule,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeamsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
