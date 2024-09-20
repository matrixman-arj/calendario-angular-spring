import { TestBed } from '@angular/core/testing';

import { AgendamentoModalService } from './agendamento-modal.service';

describe('AgendamentoModalService', () => {
  let service: AgendamentoModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendamentoModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
