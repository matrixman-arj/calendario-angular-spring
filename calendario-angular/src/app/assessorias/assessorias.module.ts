import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { AssessoriaFormComponent } from './assessoria-form/assessoria-form.component';
import { AssessoriasRoutingModule } from './assessorias-routing.module';
import { AssessoriasComponent } from './assessorias/assessorias.component';



@NgModule({
  declarations: [
    AssessoriasComponent,
    AssessoriaFormComponent
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
