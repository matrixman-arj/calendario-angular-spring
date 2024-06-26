import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoasComponent } from './pessoas/pessoas.component';
import { PessoasListaComponent } from './pessoas-lista/pessoas-lista.component';



@NgModule({
  declarations: [
    PessoasComponent,
    PessoaFormComponent,
    PessoasListaComponent
  ],
  imports: [
    CommonModule,
    PessoasRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule

  ]
})
export class PessoasModule { }
