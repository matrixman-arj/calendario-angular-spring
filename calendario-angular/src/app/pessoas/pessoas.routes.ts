import { Routes } from "@angular/router";
import { PessoasFormComponent } from "./containers/pessoas-form/pessoas-form.component";
import { PessoasComponent } from "./containers/pessoas/pessoas.component";
import { PessoaResolver } from "./guards/pessoa.resolver";

export const PESSOAS_ROUTES: Routes = [
  { path: '', component: PessoasComponent},
  { path: 'new', component: PessoasFormComponent, resolve:{pessoa: PessoaResolver}},
  { path: 'edit/:id', component: PessoasFormComponent, resolve:{pessoa: PessoaResolver}}

];
