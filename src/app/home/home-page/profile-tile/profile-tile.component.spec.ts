import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTileComponent } from './profile-tile.component';
import { ProfileService } from '../../../profile/profile.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProfileTileComponent', () => {
    let component: ProfileTileComponent;
    let fixture: ComponentFixture<ProfileTileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ProfileTileComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            imports: [ RouterTestingModule ],
            providers: [
                { provide: ProfileService, useClass: ProfileServiceStub },
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileTileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

class ProfileServiceStub {}
