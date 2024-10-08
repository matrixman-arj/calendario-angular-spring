import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendariosComponent } from './calendarios.component';

describe('CalendarsComponent', () => {
  let component: CalendariosComponent;
  let fixture: ComponentFixture<CalendariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
