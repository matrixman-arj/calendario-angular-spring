import { Routes } from "@angular/router";
import { UsuariosFormComponent } from "./containers/usuarios-form/usuarios-form.component";
import { UsuariosComponent } from "./containers/usuarios/usuarios.component";
import { UsuarioResolver } from "./guards/usuario.resolver";
import { UsuariosInativosComponent } from "./components/usuarios-inativos/usuarios-inativos.component";


export const USUARIOS_ROUTES: Routes = [
  { path: '', component: UsuariosComponent},
  { path: 'new', component: UsuariosFormComponent, resolve:{usuario: UsuarioResolver}},
  { path: 'edit/:id', component: UsuariosFormComponent, resolve:{usuario: UsuarioResolver}},
  { path: 'inativos', component: UsuariosInativosComponent, resolve:{usuario: UsuarioResolver}}

];
