/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { MenuService } from '../sidenav';
import { HealthService } from '../error-handling';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { TitleService } from '../title.service';
import { ProfileModule } from './profile.module';


describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                RouterTestingModule,
                ProfileModule,
            ],
            providers: [
                HealthService,
                MenuService,
                ProfileService,
                TitleService,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
