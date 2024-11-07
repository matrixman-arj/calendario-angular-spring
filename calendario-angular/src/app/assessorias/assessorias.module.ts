import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




import { AssessoriasRoutingModule } from './assessorias-routing.module';
import { AssessoriasComponent } from './containers/assessorias/assessorias.component';
import { AssessoriaListaComponent } from './components/assessorias-lista/assessorias-lista.component';
import { AssessoriaFormComponent } from './containers/assessoria-form/assessoria-form.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [
    CommonModule,
    AssessoriasRoutingModule,
    FormsModule, // Adicione o FormsModule aqui
    MatSelectModule, // Adicione o MatSelectModule aqui
    ReactiveFormsModule,
    AssessoriasComponent,
    AssessoriaFormComponent,
    AssessoriaListaComponent
]
})
export class AssessoriasModule { }
