import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pessoas'},
  { path: '', pathMatch: 'full', redirectTo: 'assessorias'},
  { path: '', pathMatch: 'full', redirectTo: 'agendamentos'},

  {
    path: 'pessoas',
    loadChildren: () => import('./pessoas/pessoas.routes').then(m => m.PESSOAS_ROUTES)
  },

  {
    path: 'assessorias',
    loadChildren: () => import('./assessorias/assessorias.routes').then(m => m.ASSESSORIAS_ROUTES)
  },

  {
    path: 'agendamentos',
    loadChildren: () => import('./agendamentos/agendamentos.routes').then(m => m.AGENDAMENTOS_ROUTES)
  }

];
