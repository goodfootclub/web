import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TeamsListComponent } from './teams-list.component';

describe('TeamsListComponent', () => {
    let component: TeamsListComponent;
    let fixture: ComponentFixture<TeamsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TeamsListComponent ],
            imports: [
                MaterialModule,
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
