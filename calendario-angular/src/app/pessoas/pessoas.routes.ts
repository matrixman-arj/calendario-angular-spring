import { Routes } from "@angular/router";
import { PessoasComponent } from "./containers/pessoas/pessoas.component";
import { PessoaResolver } from "./guards/pessoa.resolver";

export const PESSOAS_ROUTES: Routes = [
  { path: '', component: PessoasComponent},
  { path: 'new', component: PessoasComponent, resolve:{pessoa: PessoaResolver}},
  { path: 'edit/:id', component: PessoasComponent, resolve:{pessoa: PessoaResolver}}

];
