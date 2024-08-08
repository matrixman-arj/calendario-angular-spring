
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Location } from '@angular/common';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AssessoriasService } from '../../services/assessorias.service';
import { Assessoria } from '../../model/assessoria';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';


@Component({
  selector: 'app-assessoria-form',
  templateUrl: './assessoria-form.component.html',
  styleUrl: './assessoria-form.component.scss'
})
export class AssessoriaFormComponent implements OnInit {

  form: UntypedFormGroup;

  @Output() add = new EventEmitter(false);

  constructor( private http: HttpClient,
    private formBuilder: UntypedFormBuilder,
    private service: AssessoriasService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
  ) {

    this.form = this.formBuilder.group({
      _id: [null],
      descricao: [null],
      sigla: [null],
      //assessoria_pai_id: [null],
     // ordem: [null],
      //interna: [null]

    });
  }



    ngOnInit(): void {
      const assessoria: Assessoria = this.route.snapshot.data['assessoria'];
      this.form.setValue({
        _id: assessoria._id,
        descricao: assessoria.descricao,
        sigla: assessoria.sigla,
       // assessoria_pai_id: assessoria.assessoria_pai_id,
        //ordem: assessoria.ordem,
        //: assessoria.interna


      });

  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe(result => this.onSuccess(), error => this.onError());
  }

  onAdd(){
    this.add.emit(true);
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess(){
    this.snackBar.open('Assessoria salva com sucesso!', '', { duration: 3000});
    this.onCancel();
}

private onError() {
  this.dialog.open(ErrorDialogComponent, {
    data: 'Erro ao salvar pessoa.'
  });
}


}
