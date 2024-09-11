import { NgModule } from '@angular/core';
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



@NgModule({
  declarations: [
    AgendamentosComponent,
    AgendamentoFormComponent,
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
  ]
})
export class AgendamentosModule { }