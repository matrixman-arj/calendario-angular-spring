import { Routes } from '@angular/router';
import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component';
import { LoginComponent } from './login/login.component';

export const APP_ROUTES: Routes = [
  { path: '', component: LoginComponent }, // Define LoginComponent como página inicial

  // { path: '', pathMatch: 'full', redirectTo: 'pessoas' }, // Redireciona para "pessoas"


  {
    path: 'pessoas',
    loadChildren: () =>
      import('./pessoas/pessoas.routes').then((m) => m.PESSOAS_ROUTES),
  },

  {
    path: 'assessorias',
    loadChildren: () =>
      import('./assessorias/assessorias.routes').then((m) => m.ASSESSORIAS_ROUTES),
  },

  {
    path: 'agendamentos',
    loadChildren: () =>
      import('./agendamentos/agendamentos.routes').then((m) => m.AGENDAMENTOS_ROUTES),
  },

  {
    path: 'auditorios',
    loadChildren: () =>
      import('./auditorios/auditorios.routes').then((m) => m.AUDITORIOS_ROUTES),
  },
  {
    path: 'videoConferencias',
    loadChildren: () =>
      import('./videoConferencias/videoConferencias.routes').then((m) => m.VIDEOCONFERENCIAS_ROUTES,
      ),
  },

  {
    path: 'custom-sidenav',
    loadChildren: () =>
      import('./components/custom-sidenav/custom-sidenav.routes').then((m) => m.CUSTOMSIDENAV_ROUTES,
      ),
    component: CustomSidenavComponent, // Use o componente standalone
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.routes').then((m) => m.LOGIN_ROUTES,
      ),
    component: LoginComponent, // Use o componente standalone
  },
];
