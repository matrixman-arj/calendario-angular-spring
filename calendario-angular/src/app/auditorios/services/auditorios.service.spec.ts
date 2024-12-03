import { TestBed } from '@angular/core/testing';

import { AuditoriosService } from './auditorios.service';

describe('AuditoriosService', () => {
  let service: AuditoriosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditoriosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
