import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';



import { PessoasListaComponent } from './components/pessoas-lista/pessoas-lista.component';
import { PessoasFormComponent } from './containers/pessoas-form/pessoas-form.component';
import { PessoasComponent } from './containers/pessoas/pessoas.component';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { IMaskModule } from 'angular-imask';


@NgModule({
    imports: [
    CommonModule,
    PessoasRoutingModule,
    ReactiveFormsModule,
    IMaskModule,
    PessoasComponent,
    PessoasFormComponent,
    PessoasListaComponent
]
})
export class PessoasModule { }
