import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoConferenciasListaComponent } from './video-conferencias-lista.component';

describe('VideoConferenciasListaComponent', () => {
  let component: VideoConferenciasListaComponent;
  let fixture: ComponentFixture<VideoConferenciasListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [VideoConferenciasListaComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(VideoConferenciasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
