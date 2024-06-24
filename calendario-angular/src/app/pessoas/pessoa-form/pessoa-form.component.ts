import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrl: './pessoa-form.component.scss'
})
export class PessoaFormComponent implements OnInit {

  form: FormGroup;
  readonly floatLabelControl = new FormControl('liberado' as FloatLabelType);

  constructor(private formBuilder: FormBuilder){
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

  }

  onCancel() {

  }

}
