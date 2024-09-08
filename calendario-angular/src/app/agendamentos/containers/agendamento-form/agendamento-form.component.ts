import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Agendamento } from '../../modelo/Agendamento';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AgendamentosService } from '../../services/agendamentos.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Location } from '@angular/common';
import { Pessoa } from '../../../pessoas/model/pessoa';
import { AssessoriasService } from '../../../assessorias/services/assessorias.service';
import { Assessoria } from '../../../assessorias/model/assessoria';
import { PessoasService } from '../../../pessoas/services/pessoas.service';
import { AgendamentoModalComponent } from './agendamento-modal/agendamento-modal.component';

@Component({
  selector: 'app-agendamento-form',
  templateUrl: './agendamento-form.component.html',
  styleUrl: './agendamento-form.component.scss'
})
export class AgendamentoFormComponent implements OnInit {

  agendamentos: Agendamento[] = [];


  form: UntypedFormGroup;

  pessoas: Pessoa[] = [];


  assessorias: Assessoria[] = [];

  @Output() add = new EventEmitter(false);
days: any;

  constructor( private http: HttpClient,
    private formBuilder: UntypedFormBuilder,
    private service: AgendamentosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    private assessoriasService: AssessoriasService,
    private pessoasService: PessoasService,

  ) {

    this.form = this.formBuilder.group({
      _id: [''],
      data: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFim: [null],
      pessoa: [null],
      assessoria: [null]
    });
  }

  ngOnInit(): void {
    const agendamento: Agendamento = this.route.snapshot.data['agendamento'];

    if (agendamento) {
      this.form.setValue({
        _id: agendamento._id,
        data: agendamento.data,
        horaInicio: agendamento.horaInicio,
        horaFim: agendamento.horaFim,
        pessoa: agendamento.pessoa,
        assessoria: agendamento.assessoria

      });
    }

    this.service.list().subscribe(data => {
      this.agendamentos = data;
    });

    this.assessoriasService.list().subscribe((data: any[]) => {
      this.assessorias = data;
     });

     this.pessoasService.list().subscribe((data: any[]) => {
      this.pessoas = data;
     });


}

onSubmit() {

  if (this.form.valid) {
    console.log(this.form.value);
    // Lógica para enviar os dados ao backend
  this.service.save(this.form.value)
    .subscribe(result => this.onSuccess(), error => this.onError());
  }
}

onAdd(){
  this.add.emit(true);
}

onCancel() {
  this.location.back();
}

private onSuccess(){
  this.snackBar.open('Agendamento salva com sucesso!', '', { duration: 3000});
  this.onCancel();
}

private onError() {
this.dialog.open(ErrorDialogComponent, {
  data: 'Erro ao salvar agendamento.'
});
}

openAgendamentoModal(day: any): void {
  const dialogRef = this.dialog.open(AgendamentoModalComponent, {
    width: '400px',
    data: { date: day.date }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      day.agendamento = result; // Atualiza a célula do calendário
    }
  });
}


}
