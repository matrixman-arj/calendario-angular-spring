import { Routes } from "@angular/router";
import { AgendamentoFormComponent } from "./containers/agendamento-form/agendamento-form.component";
import { AgendamentosComponent } from "./containers/agendamentos/agendamentos.component";
import { AgendamentoResolver } from "./guards/agendamento.resolver";

export const AGENDAMENTOS_ROUTES: Routes = [
  { path: '', component: AgendamentosComponent},
  { path: 'new', component: AgendamentoFormComponent, resolve:{agendamento: AgendamentoResolver}},
  { path: 'edit/:id', component: AgendamentoFormComponent, resolve:{agendamento: AgendamentoResolver}}

];
