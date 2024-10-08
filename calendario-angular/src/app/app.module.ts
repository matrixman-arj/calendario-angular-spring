import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { PostoPipe } from './shared/pipes/posto.pipe';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IMaskModule } from 'angular-imask';
import { RecurrenceEditorModule, ScheduleModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';

import { CalendariosComponent } from './calendarios/calendarios.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SharedModule } from './shared/shared.module';
import { CalendarioComponent } from './calendario/calendario.component';
import { CommonModule } from '@angular/common';
import { AgendamentoFormComponent } from './agendamentos/containers/agendamento-form/agendamento-form.component';
import { ResizableModule } from 'angular-resizable-element';


@NgModule({
  declarations: [
    AppComponent,
    PostoPipe,
    CalendarioComponent,
    CalendariosComponent,


  ],
  exports: [
    PostoPipe,

  ],

  imports: [
    CommonModule,
    IMaskModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ScheduleModule,
    RecurrenceEditorModule,
    SharedModule,
    ResizableModule,


    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

  ],
  providers: [
    DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
