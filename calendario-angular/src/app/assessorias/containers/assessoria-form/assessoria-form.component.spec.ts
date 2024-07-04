import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessoriaFormComponent } from './assessoria-form.component';

describe('AssessoriaFormComponent', () => {
  let component: AssessoriaFormComponent;
  let fixture: ComponentFixture<AssessoriaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessoriaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessoriaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
