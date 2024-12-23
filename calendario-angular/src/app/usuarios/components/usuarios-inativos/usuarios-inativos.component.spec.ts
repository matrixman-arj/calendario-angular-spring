import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosInativosComponent } from './usuarios-inativos.component';



describe('UsuariosInativosComponent', () => {
  let component: UsuariosInativosComponent;
  let fixture: ComponentFixture<UsuariosInativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosInativosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosInativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
