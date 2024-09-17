import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Agendamento } from '../../modelo/Agendamento';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfimationDialogComponent } from '../../../shared/components/error-dialog/confimation-dialog/confimation-dialog.component';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { AgendamentosService } from '../../services/agendamentos.service';
import { FormBuilder } from '@angular/forms';
import { AgendamentoModalComponent } from '../agendamento-form/agendamento-modal/agendamento-modal.component';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrl: './agendamentos.component.scss'
})
export class AgendamentosComponent implements OnInit{

  agendamentos$!: Observable<Agendamento[]>;


  @Input() agendamentos2: { [key: string]: Agendamento[] } = {}; // Inicializa com um objeto vazio
  @Output() editAgendamento = new EventEmitter<Agendamento>();



  constructor(
    private fb: FormBuilder,
    private agendamentosService: AgendamentosService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute

  ){
    this.refresh();
  }

    refresh(){
    this.agendamentos$ = this.agendamentosService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar agendamentos');
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(agendamento: Agendamento) {
    this.router.navigate(['edit', agendamento._id], {relativeTo: this.route});
    this.refresh();
    }

    onRemove(agendamento: Agendamento) {

    const dialogRef = this.dialog.open(ConfimationDialogComponent, {
      data: 'Tem certeza quanto a remoção desse agendamento?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result){
        this.agendamentosService.remove(agendamento._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Agendamento removido com sucesso!', 'X', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'

            });
          }
        );
      }
    });
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

}
