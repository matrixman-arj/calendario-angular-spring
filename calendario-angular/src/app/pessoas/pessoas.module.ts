import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { PessoasListaComponent } from './components/pessoas-lista/pessoas-lista.component';
import { PessoasFormComponent } from './containers/pessoas-form/pessoas-form.component';
import { PessoasComponent } from './containers/pessoas/pessoas.component';
import { PessoasRoutingModule } from './pessoas-routing.module';


@NgModule({
  declarations: [
    PessoasComponent,
    PessoasFormComponent,
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
