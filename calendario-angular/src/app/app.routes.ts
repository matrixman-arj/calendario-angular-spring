import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pessoas'},
  { path: '', pathMatch: 'full', redirectTo: 'assessorias'},
  { path: '', pathMatch: 'full', redirectTo: 'agendamentos'},
  { path: '', pathMatch: 'full', redirectTo: 'auditorios'},
  { path: '', pathMatch: 'full', redirectTo: 'videoConferencias'},

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
  },

  {
    path: 'auditorios',
    loadChildren: () => import('./auditorios/auditorios.routes').then(m => m.AUDITORIOS_ROUTES)
  },

  {
    path: 'videoConferencias',
    loadChildren: () => import('./videoConferencias/videoConferencias.routes').then(m => m.VIDEOCONFERENCIAS_ROUTES)
  }

];
