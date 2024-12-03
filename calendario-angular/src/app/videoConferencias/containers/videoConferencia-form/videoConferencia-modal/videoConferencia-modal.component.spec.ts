import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoConferenciaModalComponent } from './videoConferencia-modal.component';

describe('VideoConferenciaModalComponent', () => {
  let component: VideoConferenciaModalComponent;
  let fixture: ComponentFixture<VideoConferenciaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [VideoConferenciaModalComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(VideoConferenciaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
