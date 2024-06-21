import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pessoas'},
  { path: '', pathMatch: 'full', redirectTo: 'assessorias'},

  {
    path: 'pessoas',
    loadChildren: () => import('./pessoas/pessoas.module').then(m => m.PessoasModule)
  },

  {
    path: 'assessorias',
    loadChildren: () => import('./assessorias/assessorias.module').then(m => m.AssessoriasModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
