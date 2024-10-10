import { Component, computed, ElementRef, EventEmitter, Input, input, InputSignal, OnInit, Output, Renderer2, signal, Signal, WritableSignal } from '@angular/core';

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
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ResizeEvent } from 'angular-resizable-element';
import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { DropEvent } from 'angular-draggable-droppable';


@Component({
  selector: 'app-agendamento-form',
  templateUrl: './agendamento-form.component.html',
  styleUrl: './agendamento-form.component.scss'
})
export class AgendamentoFormComponent implements OnInit {

  private resizing = false;
  private initialX = 0;
  private initialWidth = 0;
  private calendarCellWidth = 100; // Defina o valor de largura para uma célula do dia
  private currentAgendamento: any;

  viewDate: Date = new Date();
  // events: CalendarEvent[] = [];

  agendamento!: Agendamento;

  agendamentos$!: Observable<Agendamento[]>;

  @Input() agendamentos2: { [key: string]: Agendamento[] } = {}; // Inicializa com um objeto vazio

  agendamentos: InputSignal<Meetings> = input.required();
  hoje: Signal<DateTime> = signal(DateTime.local());
  primeiroDiaDoMesAtivo: WritableSignal<DateTime> = signal(
    this.hoje().startOf('month'),
  );

  diaAtivo: WritableSignal<DateTime | null> = signal(null);
  diasDaSemana: Signal<string[]> = signal(['Domingo', 'Segunda', 'terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']);
  // diasDaSemana: Signal<string[]> = signal(['domingo', ...Info.weekdays('short').slice(0, 6)]);


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

  // goToToday(): void {
  //   this.primeiroDiaDoMesAtivo.set(this.hoje().startOf('month'));
  // }


  goToToday() {
    this.viewDate = new Date();
  }

  previousMonth() {
    const prevMonth = new Date(this.viewDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    this.viewDate = prevMonth;
  }

  nextMonth() {
    const nextMonth = new Date(this.viewDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    this.viewDate = nextMonth;
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
        // Preenche o modal para edição, quando clicado em um agengamento existente a partir do calendário
        id: agendamento.id,
        data: agendamento.data,
        horaInicio: agendamento.horaInicio,
        horaFim: agendamento.horaFim,
        pessoa: agendamento.pessoa,
        assessoria: agendamento.assessoria,
        acessorios: agendamento.acessorios,
        audiencia: agendamento.audiencia,
        evento: agendamento.evento,
        diex: agendamento.diex,
        militarLigacao: agendamento.militarLigacao


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
    // private agendamentoModalService: AgendamentoModalService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    private assessoriasService: AssessoriasService,
    private pessoasService: PessoasService,
    private renderer: Renderer2,
    private el: ElementRef

  ) {

    this.form = this.formBuilder.group({
      _id: [''],
      data: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFim: [''],
      pessoa: [null],
      assessoria: [null]
    });
  }

    startResizing(event: MouseEvent, agendamento: any) {
      this.resizing = true;
      this.initialX = event.clientX;
      this.currentAgendamento = agendamento;

      // Escuta para o movimento e finalização do redimensionamento
      this.renderer.listen('document', 'mousemove', this.resize.bind(this));
      this.renderer.listen('document', 'mouseup', this.stopResizing.bind(this));
    }

    resize(event: MouseEvent) {
      if (!this.resizing) {
        return;
      }

      const deltaX = event.clientX - this.initialX;
      const resizedDays = Math.ceil(deltaX / this.calendarCellWidth); // Calcula quantos dias foram redimensionados

      if (resizedDays > 0) {
        // Calcula a nova data de fim com base no redimensionamento
        const startDate = DateTime.fromISO(this.currentAgendamento.data);
        const newEndDate = startDate.plus({ days: resizedDays - 1 });

        // Atualiza o agendamento, mas sem mexer no DOM diretamente
        this.currentAgendamento.horaFim = newEndDate.toISO();
      }
    }

    stopResizing() {
      this.resizing = false;

      // Salvar as alterações do agendamento, se necessário
      this.saveAgendamento(this.currentAgendamento);
    }

    saveAgendamento(agendamento: any) {
      // Aqui, você pode salvar o agendamento no banco de dados, ou atualizar o modelo de dados
      console.log('Agendamento salvo:', agendamento);
    }


  trackById(index: number, meeting: any): number {
    return meeting.id; // Substitua 'id' pelo campo que identifica exclusivamente o objeto
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


// openAgendamentoModal(day: DateTime, agendamento?: Agendamento): void {
//   const dataToPass = agendamento
//     ? { // Se houver um agendamento, passa os dados para edição
//         date: day.toISODate(),
//         agendamento: agendamento
//       }
//     : { // Caso contrário, passa um objeto vazio para criação
//         date: day.toISODate(),
//         agendamento: null
//       };

//   const dialogRef = this.dialog.open(AgendamentoModalComponent, {
//     width: '600px',
//     data: dataToPass
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     if (result) {
//       // Se houver resultado, processa o resultado
//       if (agendamento) {
//         // Aqui você atualiza o agendamento existente
//         Object.assign(agendamento, result);
//       } else {
//         // Aqui você cria um novo agendamento
//         this.service.save(result).subscribe(() => {
//           this.refreshCalendar();
//           });
//       }
//     }
//   });
// }

openAgendamentoModal(day: DateTime, agendamento?: Agendamento): void {
  // Se o agendamento for passado, abrir o modal preenchido para edição
  if (agendamento) {
    const dialogRef = this.dialog.open(AgendamentoModalComponent, {
      width: '600px',
      data: {
        date: day.toISODate(),
        agendamento: agendamento  // Passa o agendamento para ser editado
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Atualiza o agendamento existente
        Object.assign(agendamento, result);
        this.service.save(agendamento).subscribe(() => {
          this.refreshCalendar();
        });
      }
    });
  } else {
    // Se não houver agendamento, abrir o modal vazio para criar um novo agendamento
    const dialogRef = this.dialog.open(AgendamentoModalComponent, {
      width: '600px',
      data: {
        date: day.toISODate(),
        agendamento: null  // Passa null para indicar que é um novo agendamento
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Adiciona o novo agendamento
        this.service.save(result).subscribe(() => {
          this.refreshCalendar();
        });
      }
    });
  }
}


addNewEvent(): void {
  const dialogRef = this.dialog.open(AgendamentoModalComponent, {
    width: '400px',
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.events = [
        ...this.events,
        {
          title: result.title,
          start: result.start,
          end: result.end,
          color: {
            primary: '#ad2121',
            secondary: '#FAE3E3',
          },
        },
      ];
    }
  });
}

handleEvent(event: CalendarEvent): void {
  const dialogRef = this.dialog.open(AgendamentoModalComponent, {
    width: '400px',
    data: event,
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      event.title = result.title;
      event.start = result.start;
      event.end = result.end;
    }
  });
}

onEventTimesChanged({
  event,
  newStart,
  newEnd,
}: CalendarEventTimesChangedEvent): void {
  event.start = newStart;
  event.end = newEnd;
  // Atualize as mudanças no servidor ou backend aqui, se necessário
  this.refresh(); // Atualiza a visualização do calendário
}


events: CalendarEvent[] = [
  {
    start: new Date('2024-10-09'),
    end: new Date('2024-10-09'),
    title: 'Agendamento Teste',
    resizable: {
      beforeStart: true,
      afterEnd: true, // Habilita redimensionamento nas duas extremidades
    },
  },
];



onDrop(event: DropEvent, newDay: DateTime): void {
  const agendamento = event.dropData as Agendamento;

  if (agendamento && newDay) {
    // Atualiza a data de início e fim do agendamento para o novo dia
    agendamento.data = newDay.toISODate() ?? undefined;  // Atualiza a data do agendamento

    // Atualize a hora de início e fim, se necessário. Você pode manter o mesmo horário
    // ou ajustar de acordo com a necessidade do seu sistema.

    this.service.save(agendamento).subscribe(() => {
      this.snackBar.open('Agendamento movido com sucesso!', 'Fechar', { duration: 3000 });
      this.refreshCalendar();  // Atualiza o calendário para refletir as mudanças
    });
  }
}

// calendarCellWidth: number = 100; // Suponha que você conheça a largura de cada célula de dia


onResizeEnd(event: ResizeEvent, agendamento: Agendamento): void {
  console.log('Evento de redimensionamento:', event);

  // Suponha que a largura de cada célula do dia no calendário seja conhecida
  const calendarCellWidth = 100; // Ajuste este valor conforme necessário

  // Calcule quantos dias o evento foi redimensionado
  const resizedDays = Math.ceil((event.rectangle.width ?? 0) / calendarCellWidth);

  if (resizedDays > 0) {
    const startDate = agendamento.data ? DateTime.fromISO(agendamento.data) : DateTime.local(); // Data de início do agendamento
    const newEndDate = startDate.plus({ days: resizedDays }); // Calcula a nova data de fim com base no redimensionamento

    // Atualiza a data de fim do agendamento para refletir o redimensionamento
    agendamento.data = startDate.toISODate() ?? undefined;
    agendamento.horaFim = newEndDate.toISODate() ?? undefined;  // Atualiza a hora de fim

    // Chame o serviço para salvar as mudanças
    this.service.save(agendamento).subscribe(() => {
      this.refreshCalendar(); // Atualiza o calendário para refletir as mudanças
      this.snackBar.open('Agendamento atualizado com sucesso!', 'Fechar', { duration: 3000 });
    });
  }
}




// onResizeEnd(event: ResizeEvent, agendamento: Agendamento): void {
//   // Captura a mudança de tamanho do redimensionamento nas bordas que você quer controlar (por ex., 'bottom')
//   const resizedDuration = event.edges.bottom
//     ? event.rectangle.height // Assumindo que o redimensionamento altera a altura
//     : 0; // Se não houver redimensionamento, atribui 0

//   // Verifica se agendamento.horaFim existe antes de processá-lo
//   if (agendamento.horaFim !== null && agendamento.horaFim !== undefined) {
//     // Atualiza a hora de fim com base no redimensionamento (por exemplo, altura em minutos)
//      DateTime.fromISO(agendamento.horaFim as string)
//       .plus({ minutes: resizedDuration }) // Garante que 'resizedDuration' é um número
//       .toISOTime();
//   } else {
//     // Define undefined se horaFim for null ou undefined
//     agendamento.horaFim = undefined;
//   }

//   // Salva o agendamento atualizado
//   this.service.save(agendamento).subscribe(() => {
//     this.snackBar.open('Agendamento atualizado com sucesso!', 'Fechar', { duration: 3000 });
//     this.refreshCalendar();
//   });
// }

// Função para recarregar os agendamentos e atualizar o calendário
refreshCalendar(): void {
  this.service.list().subscribe(agendamentos => {
    this.agendamentos2 = this.mapAgendamentosPorData(agendamentos); // Atualiza o estado dos agendamentos
  });
}

refresh(){
  this.agendamentos$ = this.service.list()
  .pipe(
    catchError(error => {
      this.onError();
      return of([])
    })
  );
}


private onError() {
  this.dialog.open(ErrorDialogComponent, {
    data: 'Erro ao tentar realisar agendamento .'
  });
}

onSubmit() {


  }



}
