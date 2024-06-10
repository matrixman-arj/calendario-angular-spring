import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoasComponent } from './pessoas/pessoas.component';



@NgModule({
  declarations: [
    PessoasComponent
  ],
  imports: [
    CommonModule,
    PessoasRoutingModule,
    MatListModule
  ]
})
export class PessoasModule { }
