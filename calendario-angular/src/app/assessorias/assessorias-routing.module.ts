import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssessoriasComponent } from './assessorias/assessorias.component';

const routes: Routes = [
  { path: '', component: AssessoriasComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessoriasRoutingModule { }
