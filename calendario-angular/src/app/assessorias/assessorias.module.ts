import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { AssessoriaFormComponent } from './assessoria-form/assessoria-form.component';
import { AssessoriasRoutingModule } from './assessorias-routing.module';
import { AssessoriasComponent } from './containers/assessorias/assessorias.component';
import { AssessoriaListaComponent } from './assessorias-lista/assessorias-lista.component';




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
