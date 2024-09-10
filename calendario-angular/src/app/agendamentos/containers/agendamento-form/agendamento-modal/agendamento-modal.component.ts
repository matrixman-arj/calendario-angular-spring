import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Pessoa } from '../../../../pessoas/model/pessoa';
import { Assessoria } from '../../../../assessorias/model/assessoria';
import { AssessoriasService } from '../../../../assessorias/services/assessorias.service';
import { PessoasService } from '../../../../pessoas/services/pessoas.service';
import { Acessorios, AcessoriosList } from '../../../../enums/Acessorios/Acessorios';
import { Agendamento } from '../../../modelo/Agendamento';
import { ActivatedRoute } from '@angular/router';
import { AgendamentosService } from '../../../services/agendamentos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../../../../shared/components/error-dialog/error-dialog.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agendamento-modal',
  templateUrl: './agendamento-modal.component.html',
  styleUrl: './agendamento-modal.component.scss'
})
export class AgendamentoModalComponent implements OnInit {

  form: UntypedFormGroup;

  @Output() add = new EventEmitter(false);

  pessoas: Pessoa [] = [];
  assessorias: Assessoria [] = [];
  selectedAcessorios: Acessorios;

  acessorios = AcessoriosList;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private agendamentosService: AgendamentosService,
    private assessoriasService: AssessoriasService,
    private pessoasService: PessoasService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<AgendamentoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.formBuilder.group({
      data: [data.date, Validators.required],
      horaInicio: ['', Validators.required],
      horaFim: ['', Validators.required],
      pessoa: [null, Validators.required],
      acessorios: [null, Validators.required]
    });

    this.assessoriasService.list().subscribe((data: any[]) => {
      this.assessorias = data;
     });

     this.pessoasService.list().subscribe((data: any[]) => {
      this.pessoas = data;
     });

     this.selectedAcessorios = Acessorios.EQUIPA_SOM;

  }
  ngOnInit(): void {
    const agendamento: Agendamento = this.route.snapshot.data['acessorios'];
    const data = new Date(); // Supondo que você tenha uma data como objeto Date
    const formattedDate = data.toISOString().split('T')[0]; // Converte para 'YYYY-MM-DD'

    const requestBody = {
      data: formattedDate, // Envia apenas a parte da data
      // outros campos
    };

    this.form.setValue({
      _id: agendamento._id || '',
      data: agendamento.data || '',
      horaInicio: agendamento.horaInicio || '',
      horaFim: agendamento.horaFim || '',
      assessoria: agendamento.assessoria || '',
      pessoa: agendamento.pessoa || '',

    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }

    this.agendamentosService.save(this.form.value)
    .subscribe(result => this.onSuccess(), error => this.onError());
  }

  onAdd(){
    this.add.emit(true);
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Agendamento salva com successo!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.dialog.open(ErrorDialogComponent, {
      data: 'Erro ao tentar realisar agendamento .'
    });
  }

  errorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')){
      return 'Campo obrigatório';

    }
    if (field?.hasError('minlength')){
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho minimo precisa ser de ${requiredLength} caractéres.`;

    }

    if (field?.hasError('pattern')){
      const requiredPattern = field.errors ? field.errors['pattern']['requiredPattern'] : '000.000.000-0';
      return `O campo só pode conter ${requiredPattern} como valores.`;

    }

    return 'Campo inválido';
    // return this.formUtils.getFieldErrorMessage(this.form, fieldName);
  }

}
