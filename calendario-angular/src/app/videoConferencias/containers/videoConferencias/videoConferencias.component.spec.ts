import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoConferenciasComponent } from './videoConferencias.component';

describe('VideoConferenciasComponent', () => {
  let component: VideoConferenciasComponent;
  let fixture: ComponentFixture<VideoConferenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [VideoConferenciasComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(VideoConferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
