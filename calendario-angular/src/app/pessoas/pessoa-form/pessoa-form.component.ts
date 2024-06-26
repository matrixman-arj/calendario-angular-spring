import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PessoasService } from '../services/pessoas.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AssessoriasService } from '../../assessorias/assessorias/services/assessorias.service';
import { Assessoria } from '../../assessorias/model/assessoria';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrl: './pessoa-form.component.scss'
})
export class PessoaFormComponent implements OnInit {

  assessoriaService = inject (PessoasService);

  listaAss: Assessoria[] = [];
  form: FormGroup;
  readonly floatLabelControl = new FormControl('liberado' as FloatLabelType);

  constructor(private formBuilder: FormBuilder,
    private service: PessoasService,
    private snackBar: MatSnackBar){
    this.form = this.formBuilder.group({

      identidade:     [null],
	    tipoAcesso:     [null],
      nome:           [null],
      nomeGuerra:     [null],
	    postoGraduacao: [null],
      assessoria:     [null],
	    liberado:       [null],
      ramal:          [null],
      foto:           [null]

    });


  }




  ngOnInit(): void {

  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe(result => console.log(result), error => {
        this.snackBar.open('Erro ao salvar pessoa');

      });


  }

  onCancel() {

  }

  private onError() {
    this.snackBar.open('Erro ao salvar pessoa.', '', { duration: 3000});
  }

}
