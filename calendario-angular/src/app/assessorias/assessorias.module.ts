import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';

import { AssessoriasRoutingModule } from './assessorias-routing.module';
import { AssessoriasComponent } from './containers/assessorias/assessorias.component';
import { AssessoriaListaComponent } from './components/assessorias-lista/assessorias-lista.component';
import { AssessoriaFormComponent } from './containers/assessoria-form/assessoria-form.component';






@NgModule({
  declarations: [
    AssessoriasComponent,
    AssessoriaFormComponent,
    AssessoriaListaComponent
  ],
  imports: [
    CommonModule,
    AssessoriasRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule

  ]
})
export class AssessoriasModule { }
