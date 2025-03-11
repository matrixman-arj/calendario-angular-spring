import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaDetalhesModalComponent } from './pessoa-detalhes-modal.component';

describe('PessoaDetalhesModalComponent', () => {
  let component: PessoaDetalhesModalComponent;
  let fixture: ComponentFixture<PessoaDetalhesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PessoaDetalhesModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PessoaDetalhesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
