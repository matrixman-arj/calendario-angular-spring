import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriosListaComponent } from './auditorios-lista.component';

describe('AuditoriosListaComponent', () => {
  let component: AuditoriosListaComponent;
  let fixture: ComponentFixture<AuditoriosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AuditoriosListaComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(AuditoriosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
