
import { NgModule } from '@angular/core';

import { AgendamentosComponent } from './containers/agendamentos/agendamentos.component';
import { AgendamentoFormComponent } from './containers/agendamento-form/agendamento-form.component';

import { RouterModule, Routes } from '@angular/router';
import { AgendamentoResolver } from './guards/agendamento.resolver';


const routes: Routes = [
  { path: '', component: AgendamentosComponent},
  { path: 'new', component: AgendamentoFormComponent, resolve:{agendamentos: AgendamentoResolver}},
  { path: 'edit/:id', component: AgendamentosComponent, resolve:{agendamentos: AgendamentoResolver}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendamentosRoutingModule { }
