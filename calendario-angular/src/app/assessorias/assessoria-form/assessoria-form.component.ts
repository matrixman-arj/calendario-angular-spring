
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Location } from '@angular/common';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AssessoriasService } from '../services/assessorias.service';

@Component({
  selector: 'app-assessoria-form',
  templateUrl: './assessoria-form.component.html',
  styleUrl: './assessoria-form.component.scss'
})
export class AssessoriaFormComponent implements OnInit {

  form: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,
    private service: AssessoriasService,
    private snackBar: MatSnackBar,
    private location: Location) {

    this.form = this.formBuilder.group({

      descricao: [null],
      sigla: [null]

    });
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
    this.snackBar.open('Assessoria salva com sucesso!', '', { duration: 3000});
    this.onCancel();
}

  private onError() {
    this.snackBar.open('Erro ao salvar assessoria.', '', { duration: 3000});
  }


}
