import { Assessoria } from './../../../assessorias/model/assessoria';
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { PessoasService } from '../../services/pessoas.service';
import { ActivatedRoute } from '@angular/router';

import { AssessoriasService } from '../../../assessorias/services/assessorias.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrl: './pessoa-form.component.scss'
})
export class PessoaFormComponent implements OnInit {

  //assessorias: Assessoria[] = [];

  assessorias: Observable<Assessoria[]> | undefined;

  form = this.formBuilder.group({

    identidade:     [''],
    tipoAcesso:     [''],
    nome:           [''],
    nomeGuerra:     [''],
    postoGraduacao: [''],
    assessoria:     [  ],
    liberado:       [''],
    ramal:          [''],
    foto:           ['']

  });

   constructor(private formBuilder: NonNullableFormBuilder,
    private service: PessoasService,
    private serviceAsse: AssessoriasService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute){
    //this.form


  }

  ngOnInit(): void {

    this.assessorias = this.serviceAsse.list();

    /*this.serviceAsse.list().subscribe(listaAsse => {
      this.assessorias = listaAsse;
      console.log(listaAsse);
    });*/
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
