import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoConferenciaFormComponent } from './videoConferencia-form.component';

describe('VideoConferenciaFormComponent', () => {
  let component: VideoConferenciaFormComponent;
  let fixture: ComponentFixture<VideoConferenciaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [VideoConferenciaFormComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(VideoConferenciaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
