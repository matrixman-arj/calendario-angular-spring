import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoasComponent } from './pessoas/pessoas.component';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';



@NgModule({
  declarations: [
    PessoasComponent,
    PessoaFormComponent
  ],
  imports: [
    CommonModule,
    PessoasRoutingModule,
    AppMaterialModule,
    SharedModule

  ]
})
export class PessoasModule { }
