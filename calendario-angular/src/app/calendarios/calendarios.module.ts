import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { ResizableModule, ResizeEvent } from 'angular-resizable-element';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter, MOMENT } from 'angular-calendar';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { SchedulerModule } from 'angular-calendar-scheduler';
import { CalendariosComponent } from './calendarios.component';
import { CalendariosRoutingModule } from './calendarios-routing.module';



@NgModule({
  declarations: [



  ],
  imports: [
    CommonModule,
    CalendariosRoutingModule,
    AppMaterialModule,
    SharedModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule, // Certifique-se de importar o MatCardModule
    ReactiveFormsModule,
    MatInputModule, // Outros módulos do Angular Material que você esteja usando


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
export class CalendariosModule {

  onResizeEnd(event: ResizeEvent): void {
    console.log('Resize event:', event);
  }

 }
