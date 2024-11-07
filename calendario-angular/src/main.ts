import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ResizableModule } from 'angular-resizable-element';
import { provideRouter } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CalendarModule as PrimeNgCalendarModule } from 'primeng/calendar';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IMaskModule } from 'angular-imask';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService, ScheduleModule, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, FullCalendarModule, MatDialogModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, FormsModule, ReactiveFormsModule, MatSelectModule, MatSnackBarModule, MatDividerModule, MatIconModule, IMaskModule, MatToolbarModule, MatListModule, CalendarModule, PrimeNgCalendarModule, ButtonModule, // Outros módulos PrimeNG
        DialogModule, ScheduleModule, RecurrenceEditorModule, // Adicionando o RouterModule com forRoot
        ResizableModule, // Adicione o módulo de redimensionamento aqui
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        })),
        DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService,
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        provideRouter([])
    ]
})
  .catch(err => console.error(err));
