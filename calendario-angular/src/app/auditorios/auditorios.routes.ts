import { Routes } from "@angular/router";
import { AuditorioFormComponent } from "./containers/auditorio-form/auditorio-form.component";
import { AuditoriosComponent } from "./containers/auditorios/auditorios.component";
import { AuditorioResolver } from "./guards/auditorio.resolver";

export const AUDITORIOS_ROUTES: Routes = [
  { path: '', component: AuditoriosComponent},
  { path: 'new', component: AuditorioFormComponent, resolve:{auditorio: AuditorioResolver}},
  { path: 'edit/:id', component: AuditorioFormComponent, resolve:{auditorio: AuditorioResolver}}

];
