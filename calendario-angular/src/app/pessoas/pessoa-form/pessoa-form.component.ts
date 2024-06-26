import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';


import { PessoasService } from '../services/pessoas.service';


@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrl: './pessoa-form.component.scss'
})
export class PessoaFormComponent implements OnInit {

  form = this.formBuilder.group({

    identidade:     [''],
    tipoAcesso:     [''],
    nome:           [''],
    nomeGuerra:     [''],
    postoGraduacao: [''],
    assessoria:     [''],
    liberado:       [''],
    ramal:          [''],
    foto:           ['']

  });

   constructor(private formBuilder: NonNullableFormBuilder,
    private service: PessoasService,
    private snackBar: MatSnackBar,
    private location: Location){
    //this.form
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe(result => this.onSuccess(), error => this.onError());


  }

  onCancel() {
    this.location.back();
  }

  private onSuccess(){
      this.snackBar.open('Pessoa salva com sucesso!', '', { duration: 3000});
      this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar pessoa.', '', { duration: 3000});
  }

}
