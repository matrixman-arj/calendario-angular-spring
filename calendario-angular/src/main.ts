import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DayService, MonthAgendaService, MonthService, RecurrenceEditorModule, ScheduleModule, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { IMaskModule } from 'angular-imask';
import { ResizableModule } from 'angular-resizable-element';
import { ButtonModule } from 'primeng/button';
import { CalendarModule as PrimeNgCalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlPtBr } from './app/_util/paginator-ptbr-i8n';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';


bootstrapApplication(AppComponent, {
    providers: [
        BrowserAnimationsModule,
        MatSidenavModule,
        importProvidersFrom(BrowserModule, FullCalendarModule, MatDialogModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, FormsModule, ReactiveFormsModule, MatSelectModule, MatSnackBarModule, MatDividerModule, MatIconModule, IMaskModule, MatToolbarModule, MatListModule, CalendarModule, PrimeNgCalendarModule, ButtonModule, // Outros módulos PrimeNG
        DialogModule, ScheduleModule, RecurrenceEditorModule, // Adicionando o RouterModule com forRoot
        ResizableModule, // Adicione o módulo de redimensionamento aqui
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        })),
        { provide: MatPaginatorIntl, useClass: MatPaginatorIntlPtBr },
        DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService,
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        provideRouter(APP_ROUTES, withPreloading(PreloadAllModules))
    ]
})
  .catch(err => console.error(err));
