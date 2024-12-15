import { Routes } from '@angular/router';
import { LivrosListComponent } from './components/livros/livros-list/livros-list.component';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { LivrosFormComponent } from './components/livros/livros-form/livros-form.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { AutoresListComponent } from './components/autor/autor-list/autor-list.component';
import { BibliotecaListComponent } from './components/biblioteca/biblioteca-list/biblioteca-list.component';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "admin", component: PrincipalComponent, children:[
        {path: "dashboard", component: DashboardComponent},

        {path: "livros", component: LivrosListComponent},
        {path: "livros/:page", component: LivrosListComponent},
        {path: "livros/new", component: LivrosFormComponent},
        {path: "livros/edit/:id", component: LivrosFormComponent},

        {path: "autores", component: AutoresListComponent},
        
        {path: "bibliotecas", component: BibliotecaListComponent}
    ]}
];
