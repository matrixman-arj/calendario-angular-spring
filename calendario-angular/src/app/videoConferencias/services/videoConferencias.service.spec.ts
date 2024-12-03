import { TestBed } from '@angular/core/testing';

import { VideoConferenciasService } from './videoConferencias.service';

describe('VideoConferenciasService', () => {
  let service: VideoConferenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoConferenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
