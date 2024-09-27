import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Agendamento } from '../../modelo/Agendamento';

import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { DateTime } from 'luxon';
import { AgendamentoModalComponent } from '../../containers/agendamento-form/agendamento-modal/agendamento-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AgendamentosService } from '../../services/agendamentos.service';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';


@Component({
  selector: 'app-agendamentos-lista',
  templateUrl: './agendamentos-lista.component.html',
  styleUrl: './agendamentos-lista.component.scss'
})
export class AgendamentosListaComponent implements OnInit {

  agendamentos$!: Observable<Agendamento[]>;

  diaAtivo: DateTime | null = null; // Defina a propriedade diaAtivo aqui
  @Input() agendamentos2: { [key: string]: Agendamento[] } = {}; // Inicializa com um objeto vazio
  @Input() agendamentos: Agendamento[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter<Agendamento>(); // Mudança aqui para passar o agendamento
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ['data','horaInicio', 'horaFim', 'pessoa', 'assessoria', 'acoes'];


  dataSource = new MatTableDataSource<Agendamento>();
  dateHoje: string | undefined;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private agendamentosService: AgendamentosService
  ) { }


  ngOnInit(): void {

    // this.dataSource.data = this.agendamentos;

    this.http.get<Agendamento[]>('/api/agendamentos').subscribe(data => {
      this.dataSource.data = data;
      console.log(data)
    });


  }

  onAdd(){
    this.add.emit(true);
  }

  onEdit(agendamento: Agendamento ){
    console.log(agendamento._id)
    this.edit.emit(agendamento);// Emite o agendamento para o componente pai

    const day = DateTime.local(); // Usa a data atual como DateTime
    this.openAgendamentoModal(day, agendamento);
  }

  //  Novo método para escutar o evento de edição
//   onEdit(agendamento: Agendamento): void {
//     console.log(agendamento.pessoa)
//     if (agendamento.data) {
//         const day = DateTime.fromISO(agendamento.data); // Mantém como DateTime
//         this.openAgendamentoModal(day, agendamento); // Chama o modal com o DateTime e o agendamento
//     } else {
//         console.error('A data do agendamento está indefinida.');
//         // Define um comportamento padrão, como atribuir a data atual
//         const day = DateTime.local(); // Usa a data atual como DateTime
//         this.openAgendamentoModal(day, agendamento);
//     }
// }

// Função para abrir o modal de edição com os dados do agendamento selecionado
// onEdit(agendamento: Agendamento): void {
//   const dialogRef = this.dialog.open(AgendamentoModalComponent, {
//     width: '600px',
//     data: { agendamento: agendamento } // Passa o agendamento selecionado como dado
//   });

//   // Ação após fechar o modal (caso precise atualizar a lista, por exemplo)
//   dialogRef.afterClosed().subscribe(result => {
//     if (result) {
//       // Faça alguma ação, como recarregar a lista de agendamentos
//       this.refresh();
//     }
//   });
// }

refresh(){
  this.agendamentos$ = this.agendamentosService.list()
  .pipe(
    catchError(error => {
      this.onError();
      return of([])
    })
  );
}



  // onEdit(agendamento: Agendamento): void {
  //     if (agendamento.data) {
  //         const day = DateTime.fromISO(agendamento.data).toFormat('yyyy-MM-dd'); // Extrai a data do agendamento
  //         this.openAgendamentoModal(day, agendamento); // Chama o modal com a data e o agendamento
  //     } else {
  //         console.error('A data do agendamento está indefinida.');
  //         // Aqui você pode definir um comportamento padrão, como atribuir a data atual
  //         const day = DateTime.local();
  //         this.openAgendamentoModal(day, agendamento);
  //     }
  // }

  openAgendamentoModal(day: DateTime, agendamento?: any): void {
    // Configura a hora para o início do dia
    const dateOnly = day.startOf('day');

    // Cria um objeto que inclui a data e o agendamento (se houver)
    const dataToPass = {
      date: dateOnly,
      agendamento: agendamento || null // Passa o agendamento se existir, ou null se for novo
    };

    const dialogRef = this.dialog.open(AgendamentoModalComponent, {
      width: '600px',
      data: dataToPass // Passa a data e o agendamento para o modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.isAgendamentoValido(result, day)) {
          // Salva o novo agendamento se for válido
          // Aqui você deve adicionar a lógica para salvar o agendamento
        } else {
          // Exibe uma mensagem de erro
          this.snackBar.open('O agendamento não pode ser salvo. Existe um conflito de horário.', 'Fechar', {
            duration: 5000
          });
        }
        this.refreshCalendar();
      }
    });
  }

  refreshCalendar(): void {
    this.agendamentosService.list().subscribe(agendamentos => {
      this.agendamentos = agendamentos; // Atualiza o array de agendamentos
      // Outras lógicas de atualização de calendário, se necessário
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
      this.refresh();
      return {
        horaInicio: horaInicio,
        horaFim: horaFim,
        assessoria: agendamento.assessoria
      };
    });
  }

  private onError() {
    this.dialog.open(ErrorDialogComponent, {
      data: 'Erro ao tentar realisar agendamento .'
    });
  }

  onDelete(agendamento: Agendamento) {
    this.delete.emit(agendamento);
  }

}
