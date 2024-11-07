import { Routes } from "@angular/router";
import { AssessoriasComponent } from "./containers/assessorias/assessorias.component";
import { AssessoriaFormComponent } from "./containers/assessoria-form/assessoria-form.component";
import { AssessoriaResolver } from "./guards/assessoria.resolver";

export const ASSESSORIAS_ROUTES: Routes = [
  { path: '', component: AssessoriasComponent},
  { path: 'new', component: AssessoriaFormComponent, resolve:{assessoria: AssessoriaResolver}},
  { path: 'edit/:id', component: AssessoriasComponent, resolve:{assessoria: AssessoriaResolver}}

];
