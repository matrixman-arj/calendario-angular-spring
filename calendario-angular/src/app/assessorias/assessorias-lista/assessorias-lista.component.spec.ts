import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessoriasListaComponent } from './assessorias-lista.component';

describe('AssessoriasListaComponent', () => {
  let component: AssessoriasListaComponent;
  let fixture: ComponentFixture<AssessoriasListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessoriasListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessoriasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
