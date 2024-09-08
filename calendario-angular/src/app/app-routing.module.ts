import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pessoas'},
  { path: '', pathMatch: 'full', redirectTo: 'assessorias'},
  { path: '', pathMatch: 'full', redirectTo: 'agendamentos'},

  {
    path: 'pessoas',
    loadChildren: () => import('./pessoas/pessoas.module').then(m => m.PessoasModule)
  },

  {
    path: 'assessorias',
    loadChildren: () => import('./assessorias/assessorias.module').then(m => m.AssessoriasModule)
  },

  {
    path: 'agendamentos',
    loadChildren: () => import('./agendamentos/agendamentos.module').then(m => m.AgendamentosModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
