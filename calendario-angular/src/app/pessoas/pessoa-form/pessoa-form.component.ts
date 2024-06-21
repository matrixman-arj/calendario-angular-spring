import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrl: './pessoa-form.component.scss'
})
export class PessoaFormComponent implements OnInit {

  form: FormGroup;
  form2: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.form = this.formBuilder.group({

      identidade:     [null],
	    tipoAcesso:     [null],
      nome:           [null],
      nomeGuerra:     [null],
	    postoGraduacao: [null],


    });

    this.form2 = this.formBuilder.group({

	    assessoria:     [null],
	    liberado:       [null],
      ramal:          [null],
      foto:           [null]

    });
  }


  ngOnInit(): void {

  }

}
