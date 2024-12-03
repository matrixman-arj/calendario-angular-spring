import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorioFormComponent } from './auditorio-form.component';

describe('AuditorioFormComponent', () => {
  let component: AuditorioFormComponent;
  let fixture: ComponentFixture<AuditorioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AuditorioFormComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(AuditorioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
