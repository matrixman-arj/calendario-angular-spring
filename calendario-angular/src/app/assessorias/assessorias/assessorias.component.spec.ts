import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessoriasComponent } from './assessorias.component';

describe('AssessoriasComponent', () => {
  let component: AssessoriasComponent;
  let fixture: ComponentFixture<AssessoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
