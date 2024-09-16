import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoasComponent } from './containers/pessoas/pessoas.component';
import { PessoaResolver } from './guards/pessoa.resolver';
import { PessoasFormComponent } from './containers/pessoas-form/pessoas-form.component';


const routes: Routes = [
  { path: '', component: PessoasComponent},
  { path: 'new', component: PessoasFormComponent, resolve:{pessoa: PessoaResolver}},
  { path: 'edit/:id', component: PessoasFormComponent, resolve:{pessoa: PessoaResolver}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
