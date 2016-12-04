/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HealthService } from './health.service';

describe('Service: Health', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HealthService]
    });
  });

  it('should ...', inject([HealthService], (service: HealthService) => {
    expect(service).toBeTruthy();
  }));
});
