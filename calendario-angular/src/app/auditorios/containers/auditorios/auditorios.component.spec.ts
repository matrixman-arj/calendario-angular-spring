import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriosComponent } from './auditorios.component';

describe('AuditoriosComponent', () => {
  let component: AuditoriosComponent;
  let fixture: ComponentFixture<AuditoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AuditoriosComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(AuditoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
