import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasInativasComponent } from './pessoas-inativas.component';

describe('PessoasInativasComponent', () => {
  let component: PessoasInativasComponent;
  let fixture: ComponentFixture<PessoasInativasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoasInativasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PessoasInativasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
