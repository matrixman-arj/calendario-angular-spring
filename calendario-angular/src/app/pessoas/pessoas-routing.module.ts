import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PessoasComponent } from './containers/pessoas/pessoas.component';
import { PessoaFormComponent } from './containers/pessoa-form/pessoa-form.component';
import { PessoaResolver } from './guards/pessoa.resolver';


const routes: Routes = [
  { path: '', component: PessoasComponent},
  { path: 'new', component: PessoaFormComponent},
  { path: 'edit/:id', component: PessoaFormComponent, resolve:{pessoa: PessoaResolver}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
