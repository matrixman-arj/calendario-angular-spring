import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AssessoriasService } from '../assessorias/services/assessorias.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-assessoria-form',
  templateUrl: './assessoria-form.component.html',
  styleUrl: './assessoria-form.component.scss'
})
export class AssessoriaFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private service: AssessoriasService,
    private snackBar: MatSnackBar) {

    this.form = this.formBuilder.group({

      descricao: [null],
      sigla: [null]

    });
  }



    ngOnInit(): void {


  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe(result => console.log(result), error => this.onError());

  }

  onCancel() {

  }

  private onError() {
    this.snackBar.open('Erro ao salvar assessoria.', '', { duration: 3000});
  }


}
