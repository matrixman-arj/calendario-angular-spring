import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasFormComponent } from './pessoas-form.component';

describe('PessoaFormComponent', () => {
  let component: PessoasFormComponent;
  let fixture: ComponentFixture<PessoasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PessoasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
