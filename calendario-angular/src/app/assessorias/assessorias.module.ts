import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { AssessoriasRoutingModule } from './assessorias-routing.module';
import { AssessoriasComponent } from './assessorias/assessorias.component';



@NgModule({
  declarations: [
    AssessoriasComponent
  ],
  imports: [
    CommonModule,
    AssessoriasRoutingModule,
    AppMaterialModule,
    SharedModule

  ]
})
export class AssessoriasModule { }
