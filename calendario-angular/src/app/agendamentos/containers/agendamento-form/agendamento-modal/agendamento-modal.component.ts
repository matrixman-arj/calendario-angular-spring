import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pessoa } from '../../../../pessoas/model/pessoa';
import { Assessoria } from '../../../../assessorias/model/assessoria';

@Component({
  selector: 'app-agendamento-modal',
  templateUrl: './agendamento-modal.component.html',
  styleUrl: './agendamento-modal.component.scss'
})
export class AgendamentoModalComponent {

  pessoas: Pessoa [] = [];
  assessorias: Assessoria [] = [];

  itens: [] | undefined;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgendamentoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      data: [data.date, Validators.required],
      horaInicio: ['', Validators.required],
      horaFim: ['', Validators.required],
      pessoa: [null, Validators.required],
      itens: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

}
