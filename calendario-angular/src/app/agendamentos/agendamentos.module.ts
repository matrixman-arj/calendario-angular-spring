import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
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
import { CalendarModule, DateAdapter, MOMENT } from 'angular-calendar';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { SchedulerModule } from 'angular-calendar-scheduler';



@NgModule({
  declarations: [
    AgendamentosComponent,
    AgendamentosListaComponent,
    AgendamentoModalComponent,


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
    ResizableModule, // Certifique-se de importar aqui



    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

    SchedulerModule.forRoot({ locale: 'pt', headerDateFormat: 'daysRange' }),

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[

  ],

  providers: [

    { provide: LOCALE_ID, useValue: 'pt-BR' },
    // { provide: MOMENT, useValue: moment }

],

})
export class AgendamentosModule {

  onResizeEnd(event: ResizeEvent): void {
    console.log('Resize event:', event);
  }

 }
