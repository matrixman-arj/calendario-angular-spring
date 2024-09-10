import { Component, computed, EventEmitter, input, InputSignal, OnInit, Output, signal, Signal, WritableSignal } from '@angular/core';
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
import { Meetings } from './meetings.interface';
import { DateTime, Info, Interval } from 'luxon';

@Component({
  selector: 'app-agendamento-form',
  templateUrl: './agendamento-form.component.html',
  styleUrl: './agendamento-form.component.scss'
})
export class AgendamentoFormComponent implements OnInit {

  agendamentos: InputSignal<Meetings> = input.required();
  hoje: Signal<DateTime> = signal(DateTime.local());
  primeiroDiaDoMesAtivo: WritableSignal<DateTime> = signal(
    this.hoje().startOf('month'),
  );

  diaAtivo: WritableSignal<DateTime | null> = signal(null);
  diasDaSemana: Signal<string[]> = signal(Info.weekdays('short'));
  daysOfMonth: Signal<DateTime[]> = computed(() => {
    return Interval.fromDateTimes(
      this.primeiroDiaDoMesAtivo().startOf('week'),
      this.primeiroDiaDoMesAtivo().endOf('month').endOf('week'),
    )
      .splitBy({ day: 1 })
      .map((d) => {
        if (d.start === null) {
          throw new Error('Wrong dates');
        }
        return d.start;
      });
  });
  DATE_MED = DateTime.DATE_MED;
  activeDayMeetings: Signal<string[]> = computed(() => {
    const activeDay = this.diaAtivo();
    if (activeDay === null) {
      return [];
    }
    const activeDayISO = activeDay.toISODate();

    if (!activeDayISO) {
      return [];
    }

    return this.agendamentos()[activeDayISO] ?? [];
  });

  goToPreviousMonth(): void {
    this.primeiroDiaDoMesAtivo.set(
      this.primeiroDiaDoMesAtivo().minus({ month: 1 }),
    );
  }

  goToNextMonth(): void {
    this.primeiroDiaDoMesAtivo.set(
      this.primeiroDiaDoMesAtivo().plus({ month: 1 }),
    );
  }

  goToToday(): void {
    this.primeiroDiaDoMesAtivo.set(this.hoje().startOf('month'));
  }

  form: UntypedFormGroup;



  pessoas: Pessoa[] = [];


  assessorias: Assessoria[] = [];

  days: any;

  @Output() add = new EventEmitter(false);

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

    this.generateCalendar();






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



    this.assessoriasService.list().subscribe((data: any[]) => {
      this.assessorias = data;
     });

     this.pessoasService.list().subscribe((data: any[]) => {
      this.pessoas = data;
     });

}

generateCalendar() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const start = new Date(year, month, 1);  // Primeiro dia do mês
  const end = new Date(year, month + 1, 0);  // Último dia do mês

  // Calcular o dia da semana do primeiro dia do mês (0 = Domingo, 6 = Sábado)
  const startDayOfWeek = start.getDay();

  // Preencher dias vazios antes do primeiro dia do mês
  for (let i = 0; i < startDayOfWeek; i++) {
    this.days.push({ date: null }); // Dias vazios
  }

  // Preencher o mês com as datas reais
  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    this.days.push({ date: new Date(d) });
  }

}

openAgendamentoModal(day: DateTime): void {
  // Configura a hora para o início do dia
  const dateOnly = day.startOf('day');

  const dialogRef = this.dialog.open(AgendamentoModalComponent, {
    width: '600px',
    data: { date: dateOnly } // Passa apenas a data sem a hora para o modal
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Tratar o resultado do modal, como adicionar o agendamento à lista
    }
  });
}




createDaysWithAgendamentos(agendamentos: Agendamento[]): any[] {
  // Crie e retorne o array de dias com os agendamentos mapeados corretamente
  // Exemplo:
  return [...Array(7).keys()].map(i => ({
    date: new Date(), // ou data correspondente
    agendamento: agendamentos[i] // ajuste conforme necessário
  }));
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




}
function startOfMonth(arg0: Date) {
  throw new Error('Function not implemented.');
}

function endOfMonth(arg0: Date) {
  throw new Error('Function not implemented.');
}

function eachDayOfInterval(arg0: { start: any; end: any; }) {
  throw new Error('Function not implemented.');
}

