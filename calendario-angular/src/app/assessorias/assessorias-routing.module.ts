import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssessoriasComponent } from './containers/assessorias/assessorias.component';
import { AssessoriaFormComponent } from './containers/assessoria-form/assessoria-form.component';


const routes: Routes = [
  { path: '', component: AssessoriasComponent},
  { path: 'new', component: AssessoriaFormComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessoriasRoutingModule { }
