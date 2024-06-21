import { TestBed } from '@angular/core/testing';

import { AssessoriasService } from './assessorias.service';

describe('AssessoriasService', () => {
  let service: AssessoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessoriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
