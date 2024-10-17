import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostoPipe } from './shared/pipes/posto.pipe';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IMaskModule } from 'angular-imask';
import { RecurrenceEditorModule, ScheduleModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import { ResizableModule } from 'angular-resizable-element';
import { CalendarioComponent } from './calendario/calendario.component';
import { CalendariosComponent } from './calendarios/calendarios.component';
import { AgendamentoModalComponent } from './agendamentos/containers/agendamento-form/agendamento-modal/agendamento-modal.component';
import { CalendarModule , DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SharedModule } from './shared/shared.module';
import { AgendamentoFormComponent } from './agendamentos/containers/agendamento-form/agendamento-form.component';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule as PrimeNgCalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from '@fullcalendar/angular'; // Para importar o FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid';// Plugin de grid de dias
import timeGridPlugin from '@fullcalendar/timegrid';// Plugin de grid de horários
import listPlugin from '@fullcalendar/list';// Plugin de lista
import interactionPlugin from '@fullcalendar/interaction';// Plugin de interação (arrastar e soltar)
import { ButtonModule } from 'primeng/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    PostoPipe,
    CalendarioComponent,
    CalendariosComponent,  ],
  exports: [
    PostoPipe,

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule, // Importação do módulo do FullCalendar
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDividerModule,
    MatIconModule,
    IMaskModule,
    MatToolbarModule,
    MatListModule,
    CalendarModule,
    PrimeNgCalendarModule,
    ButtonModule,            // Outros módulos PrimeNG
    DialogModule,
    ScheduleModule,
    RecurrenceEditorModule,
    SharedModule,
    RouterModule.forRoot([]), // Adicionando o RouterModule com forRoot

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

  ],
  providers: [
    DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService,
    provideAnimationsAsync()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Adicione esta linha
  bootstrap: [AppComponent]
})
export class AppModule { }
