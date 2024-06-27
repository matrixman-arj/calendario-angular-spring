import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PessoasComponent } from './containers/pessoas/pessoas.component';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';

const routes: Routes = [
  { path: '', component: PessoasComponent},
  { path: 'new', component: PessoaFormComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
