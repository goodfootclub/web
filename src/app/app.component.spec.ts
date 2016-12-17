/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from 'app/app.component';
import { AppModule, ROUTES } from './app.module';


describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                RouterTestingModule,
            ],
        });
        TestBed.compileComponents();
    });
});
