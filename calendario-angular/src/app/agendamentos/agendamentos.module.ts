import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentosListaComponent } from './components/agendamentos-lista/agendamentos-lista.component';
import { AgendamentoFormComponent } from './containers/agendamento-form/agendamento-form.component';
import { AgendamentosRoutingModule } from './agendamentos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AgendamentosComponent } from './containers/agendamentos/agendamentos.component';
import { AgendamentoModalComponent } from './containers/agendamento-form/agendamento-modal/agendamento-modal.component';
import { ResizableModule, ResizeEvent } from 'angular-resizable-element';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarModule as PrimeNgCalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { FullCalendarModule } from '@fullcalendar/angular'; // FullCalendar import
import dayGridPlugin from '@fullcalendar/daygrid';// Plugin de grid de dias
import timeGridPlugin from '@fullcalendar/timegrid';// Plugin de grid de horários
import listPlugin from '@fullcalendar/list';// Plugin de lista
import interactionPlugin from '@fullcalendar/interaction';// Plugin de interação (arrastar e soltar)
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AgendamentosComponent,
    AgendamentosListaComponent,
    AgendamentoModalComponent
  ],
  imports: [
    CommonModule,
    AgendamentosRoutingModule,
    AppMaterialModule,
    SharedModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule, // Certifique-se de importar o MatCardModule
    ReactiveFormsModule,
    MatInputModule, // Outros módulos do Angular Material que você esteja usando
    DialogModule,
    PrimeNgCalendarModule, // Usando o Calendar do PrimeNG
    FullCalendarModule, // FullCalendar Module
    ButtonModule,
    RouterModule, // Certifique-se de que o RouterModule está importado


    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[

  ]
})
export class AgendamentosModule {

  onResizeEnd(event: ResizeEvent): void {
    console.log('Resize event:', event);
  }

 }
