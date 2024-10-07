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
    DragAndDropModule // Certifique-se de importar o DragAndDropModule

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
