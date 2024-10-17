import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { PostoPipe } from './pipes/posto.pipe';
import { ConfimationDialogComponent } from './components/error-dialog/confimation-dialog/confimation-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AgendamentoFormComponent } from '../agendamentos/containers/agendamento-form/agendamento-form.component';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { ResizableModule } from 'angular-resizable-element';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CalendarModule as PrimeNgCalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';// Plugin de grid de dias
import timeGridPlugin from '@fullcalendar/timegrid';// Plugin de grid de horários
import listPlugin from '@fullcalendar/list';// Plugin de lista
import interactionPlugin from '@fullcalendar/interaction';// Plugin de interação (arrastar e soltar)

@NgModule({
  declarations: [
    ErrorDialogComponent,
    ConfimationDialogComponent,
    AgendamentoFormComponent



  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    FormsModule,       // Adicione o FormsModule aqui
    MatSelectModule,    // Adicione o MatSelectModule aqui
    ResizableModule,  // Certifique-se de importar o ResizableModule
    DragAndDropModule, // Certifique-se de importar o DragAndDropModule
    CalendarModule,
    PrimeNgCalendarModule,
    ButtonModule,            // Outros módulos PrimeNG
    DialogModule,
    FullCalendarModule, // Importação do módulo do FullCalendar

  ],
  exports: [
    AgendamentoFormComponent,
    ErrorDialogComponent,
    ConfimationDialogComponent,
    ResizableModule,  // Certifique-se de importar o ResizableModule
    DragAndDropModule // Certifique-se de importar o DragAndDropModule

  ]
})
export class SharedModule { }
