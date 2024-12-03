import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorioModalComponent } from './auditorio-modal.component';

describe('AuditorioModalComponent', () => {
  let component: AuditorioModalComponent;
  let fixture: ComponentFixture<AuditorioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AuditorioModalComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(AuditorioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
