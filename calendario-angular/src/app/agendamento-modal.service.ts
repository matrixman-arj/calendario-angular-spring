import { Injectable, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


import { DateTime } from 'luxon';
import { AgendamentoModalComponent } from './agendamentos/containers/agendamento-form/agendamento-modal/agendamento-modal.component';
import { Agendamento } from './agendamentos/modelo/Agendamento';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoModalService {

  @Input() agendamentos: { [key: string]: Agendamento[] } = {}; // Inicializa com um objeto vazio
  @Input() agendamentos2: { [key: string]: Agendamento[] } = {}; // Inicializa com um objeto vazio

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar

  ) { }

  openAgendamentoModal(day: DateTime | null, agendamento?: Agendamento) {
    const dateOnly = day ? day.startOf('day') : DateTime.fromISO(agendamento?.data ?? DateTime.now().toISODate());

    const dataToPass = {
      date: dateOnly,
      agendamento: agendamento || null
    };

    return this.dialog.open(AgendamentoModalComponent, {
      width: '600px',
      data: dataToPass
    });
  }


  // openAgendamentoModal(day: DateTime | null, agendamento?: Agendamento): void {
  //   // Se `day` for nulo, use a data do agendamento
  //   const dateOnly = day
  //       ? day.startOf('day')
  //       : DateTime.fromISO(agendamento?.data ?? DateTime.now().toISODate());

  //   const dataToPass = {
  //     date: dateOnly,
  //     agendamento: agendamento || null // Passa o agendamento se existir, ou null se for novo
  //   };

  //   const dialogRef = this.dialog.open(AgendamentoModalComponent, {
  //     width: '600px',
  //     data: dataToPass // Passa a data e o agendamento para o modal
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       const dayISO = dateOnly.toISODate();
  //       if (dayISO && this.isAgendamentoValido(result, dateOnly)) {
  //         // Salva ou atualiza o agendamento
  //         this.agendamentos2[dayISO] = [...(this.agendamentos2[dayISO] || []), result];
  //         this.snackBar.open('Agendamento salvo com sucesso!', '', { duration: 5000 });
  //       } else {
  //         // Exibe uma mensagem de erro
  //         this.snackBar.open('O agendamento não pode ser salvo. Existe um conflito de horário.', 'Fechar', {
  //           duration: 5000
  //         });
  //       }
  //     }
  //   });
  // }


  // openAgendamentoModal(day: DateTime | null, agendamento?: Agendamento) {
  //   // Se `day` for nulo, use a data do agendamento; caso contrário, use a data atual
  //   const dateOnly = day ? day.startOf('day') : DateTime.fromISO(agendamento?.data ?? DateTime.local().toISODate());

  //   const dataToPass = {
  //     date: dateOnly,
  //     agendamento: agendamento || null // Passa o agendamento se existir, ou null se for novo
  //   };

  //   return this.dialog.open(AgendamentoModalComponent, {
  //     width: '600px',
  //     data: dataToPass // Passa a data e o agendamento para o modal
  //   });
  // }

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
    const agendamentos = this.agendamentos[dayISO] || [];
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

}
