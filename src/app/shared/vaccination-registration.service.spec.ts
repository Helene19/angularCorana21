import { TestBed } from '@angular/core/testing';

import { VaccinationRegistrationService } from './vaccination-registration.service';

describe('VaccinationRegistrationService', () => {
  let service: VaccinationRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccinationRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
