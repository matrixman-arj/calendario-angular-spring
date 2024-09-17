import { Component, computed, EventEmitter, Input, input, InputSignal, OnInit, Output, signal, Signal, WritableSignal } from '@angular/core';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AgendamentosService } from '../../services/agendamentos.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import { Pessoa } from '../../../pessoas/model/pessoa';
import { AssessoriasService } from '../../../assessorias/services/assessorias.service';
import { Assessoria } from '../../../assessorias/model/assessoria';
import { PessoasService } from '../../../pessoas/services/pessoas.service';
import { AgendamentoModalComponent } from './agendamento-modal/agendamento-modal.component';
import { Meetings } from './meetings.interface';
import { DateTime, Info, Interval } from 'luxon';
import { Agendamento } from '../../modelo/Agendamento';

@Component({
  selector: 'app-agendamento-form',
  templateUrl: './agendamento-form.component.html',
  styleUrl: './agendamento-form.component.scss'
})
export class AgendamentoFormComponent implements OnInit {

  @Input() agendamentos2: { [key: string]: Agendamento[] } = {}; // Inicializa com um objeto vazio
  @Output() editAgendamento = new EventEmitter<Agendamento>();

  agendamentos: InputSignal<Meetings> = input.required();
  hoje: Signal<DateTime> = signal(DateTime.local());
  primeiroDiaDoMesAtivo: WritableSignal<DateTime> = signal(
    this.hoje().startOf('month'),
  );

  diaAtivo: WritableSignal<DateTime | null> = signal(null);
  diasDaSemana: Signal<string[]> = signal(['dom.', ...Info.weekdays('short').slice(0, 6)]);
  // diasDaSemana: Signal<string[]> = signal(Info.weekdays('short'));

  daysOfMonth: Signal<DateTime[]> = computed(() => {
    // Define o primeiro e o último dia do mês atual
    const startOfCurrentMonth = this.primeiroDiaDoMesAtivo().startOf('month');
    const endOfCurrentMonth = this.primeiroDiaDoMesAtivo().endOf('month');

    // Calcula os dias da semana em que o primeiro e o último dia do mês atual caem
    const startOfWeek = startOfCurrentMonth.weekday;
    const endOfWeek = endOfCurrentMonth.weekday;

    // Adiciona dias necessários do mês anterior para completar a primeira semana
    let days = [];
    if (startOfWeek !== 7) { // Se não for domingo
      const daysFromPreviousMonth = startOfCurrentMonth.minus({ days: startOfWeek });
      for (let i = 0; i < startOfWeek; i++) {
        days.push(daysFromPreviousMonth.plus({ days: i }));
      }
    }

    // Adiciona todos os dias do mês atual
    for (let i = 0; i < endOfCurrentMonth.day; i++) {
      days.push(startOfCurrentMonth.plus({ days: i }));
    }

    // Adiciona dias do mês seguinte para completar a última semana até atingir 35 dias
    const remainingDays = 35 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(endOfCurrentMonth.plus({ days: i }));
    }

    return days.slice(0, 35); // Retorna exatamente 35 dias
  });

  DATE_MED = DateTime.DATE_MED;

  activeDayMeetings: Signal<any[]> = computed(() => {
    const activeDay = this.diaAtivo();
    if (activeDay === null) {
      return [];
    }
    const activeDayISO = activeDay.toISODate();

    if (!activeDayISO) {
      return [];
    }

    return this.agendamentos2[activeDayISO]?.map(agendamento => ({
      horaInicio: agendamento.horaInicio ? DateTime.fromISO(agendamento.horaInicio).toFormat('HH:mm') : 'N/A',
      horaFim: agendamento.horaFim ? DateTime.fromISO(agendamento.horaFim).toFormat('HH:mm') : 'N/A',
      assessoria: agendamento.assessoria
    })) || [];
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

  getAgendamentosForDay(day: DateTime): any[] {
    const dayISO = day.toISODate();
    if (!dayISO) {
      return []; // Retorna uma lista vazia se dayISO for null
    }

    // Verificar e depurar se os agendamentos estão sendo encontrados
    const agendamentos = this.agendamentos2[dayISO] || [];
    // console.log(`Agendamentos para ${dayISO}:`, agendamentos);

    return agendamentos.map(agendamento => {
      const horaInicio = agendamento.horaInicio ? DateTime.fromISO(agendamento.horaInicio).toFormat('HH:mm') : 'N/A';
      const horaFim = agendamento.horaFim ? DateTime.fromISO(agendamento.horaFim).toFormat('HH:mm') : 'N/A';

      return {
        horaInicio: horaInicio,
        horaFim: horaFim,
        assessoria: agendamento.assessoria
      };
    });
  }

  isAgendamentoValido(agendamento: any, day: DateTime): boolean {
    const agendamentosDoDia = this.getAgendamentosForDay(day);
    const horaInicioNovo = DateTime.fromISO(agendamento.horaInicio);
    const horaFimNovo = DateTime.fromISO(agendamento.horaFim);

    for (const ag of agendamentosDoDia) {
      const horaInicioExistente = DateTime.fromISO(ag.horaInicio);
      const horaFimExistente = DateTime.fromISO(ag.horaFim);

      // Verifica se o novo agendamento não está dentro do intervalo de um agendamento existente
      if (
        (horaInicioNovo < horaFimExistente && horaInicioNovo >= horaInicioExistente) ||
        (horaFimNovo > horaInicioExistente && horaFimNovo <= horaFimExistente)
      ) {
        return false; // Agendamento inválido
      }
    }

    return true; // Agendamento válido
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
  // Carrega os agendamentos do servidor
  this.http.get<Agendamento[]>('/api/agendamentos').subscribe(data => {
    this.agendamentos2 = this.mapAgendamentosPorData(data);
    console.log('Agendamentos carregados:', this.agendamentos2); // Adicione este log
  });

}

// Mapeia os agendamentos por data
mapAgendamentosPorData(agendamentos2: Agendamento[]): { [key: string]: Agendamento[] } {
  const agendamentosMap: { [key: string]: Agendamento[] } = {};
  agendamentos2.forEach(agendamento => {
    // Verifique se agendamento.data é definido e válido
    if (agendamento.data) {
      const dataISO = DateTime.fromISO(agendamento.data).toISODate(); // Obtém a data em ISO
      if (dataISO) {
        if (!agendamentosMap[dataISO]) {
          agendamentosMap[dataISO] = [];
        }
        agendamentosMap[dataISO].push(agendamento);
      }
    }
  });
  return agendamentosMap;
}


openAgendamentoModal(day: DateTime | null, agendamento?: Agendamento): void {
  // Se `day` for nulo, use a data do agendamento; caso contrário, use a data atual
  const dateOnly = day ? day.startOf('day') : DateTime.fromISO(agendamento?.data ?? DateTime.local().toISODate());

  // Verificar se `agendamento` existe
  if (!agendamento) {
    console.error('Agendamento indefinido ou inválido');
    return;
  }

  const dataToPass = {
    date: dateOnly,
    agendamento: agendamento // Passa o agendamento para edição
  };

  const dialogRef = this.dialog.open(AgendamentoModalComponent, {
    width: '600px',
    data: dataToPass // Passa a data e o agendamento para o modal
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const dayISO = dateOnly.toISODate();
      if (dayISO && this.isAgendamentoValido(result, dateOnly)) {
        // Salva ou atualiza o agendamento
        this.agendamentos2[dayISO] = [...(this.agendamentos2[dayISO] || []), result];
        this.snackBar.open('Agendamento salvo com sucesso!', '', { duration: 5000 });
      } else {
        // Exibe uma mensagem de erro
        this.snackBar.open('O agendamento não pode ser salvo. Existe um conflito de horário.', 'Fechar', {
          duration: 5000
        });
      }
    }
  });
}

  // Novo método para escutar o evento de edição
  onEditAgendamento(agendamento: Agendamento): void {
    this.openAgendamentoModal(null, agendamento);
  }



onSubmit() {


  }

}
