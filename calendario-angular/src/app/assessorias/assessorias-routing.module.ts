import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessoriasComponent } from './containers/assessorias/assessorias.component';
import { AssessoriaFormComponent } from './containers/assessoria-form/assessoria-form.component';
import { AssessoriaResolver } from '../assessorias/guards/assessoria.resolver';


const routes: Routes = [
  { path: '', component: AssessoriasComponent},
  { path: 'new', component: AssessoriaFormComponent, resolve:{assessoria: AssessoriaResolver}},
  { path: 'edit/:id', component: AssessoriaFormComponent, resolve:{assessoria: AssessoriaResolver}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessoriasRoutingModule { }
