import { TestBed } from '@angular/core/testing';

import { ClassRegistrationApiService } from './class-registration-api.service';

describe('ClassRegistrationApiService', () => {
  let service: ClassRegistrationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassRegistrationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
