import { CalendariosService } from './calendarios/services/calendarios.service';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { PessoasService } from './pessoas/services/pessoas.service';
import { ResizeEvent } from 'angular-resizable-element';
import { CalendarView, CalendarDateFormatter, DateAdapter } from 'angular-calendar';
import { addPeriod, CalendarSchedulerEvent, CalendarSchedulerEventAction, CalendarSchedulerViewComponent, DAYS_IN_WEEK, endOfPeriod, SchedulerDateFormatter, SchedulerEventTimesChangedEvent, SchedulerViewDay, SchedulerViewHour, SchedulerViewHourSegment, startOfPeriod, subPeriod } from 'angular-calendar-scheduler';
import { endOfDay, addMonths } from 'date-fns';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  // template: '<ejs-schedule></ejs-schedule>',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{
      provide: CalendarDateFormatter,
      useClass: SchedulerDateFormatter
    }]
})
export class AppComponent {
  title = 'calendario-angular';


  onResizeEnd(event: ResizeEvent): void {
    console.log('Resize event:', event);
  }

  constructor(
        private pessoaService: PessoasService
  ){}


}




