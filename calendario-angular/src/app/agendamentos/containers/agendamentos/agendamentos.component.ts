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

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrl: './agendamentos.component.scss'
})
export class AgendamentosComponent implements OnInit{

  // @Input() diaAtivo: DateTime | null = null; // Defina a propriedade diaAtivo aqui
  // @Input() agendamentos: { [key: string]: Agendamento[] } = {}; // Inicializa com um objeto vazio
  // @Output() editAgendamento = new EventEmitter<Agendamento>();


  agendamentos$!: Observable<Agendamento[]>;

  constructor(
    private fb: FormBuilder,
    private agendamentosService: AgendamentosService,
    // private agendamentoModalService: AgendamentoModalService,
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
    // console.log('entrei')
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  // onEdit(agendamento: Agendamento) {
  //   this.router.navigate(['edit', agendamento._id], {relativeTo: this.route});
  //   this.refresh();
  //   }

  onEdit(agendamento: Agendamento): void {
    if (agendamento._id) {
      this.router.navigate(['edit', agendamento._id], { relativeTo: this.route });
    } else {
      console.error('ID do agendamento está indefinido:', agendamento);
    }
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

  // getAgendamentosForDay(day: DateTime): any[] {
  //   const dayISO = day.toISODate();
  //   if (!dayISO) {
  //     return []; // Retorna uma lista vazia se dayISO for null
  //   }

  //   // Verificar e depurar se os agendamentos estão sendo encontrados
  //   const agendamentos = this.agendamentos[dayISO] || [];
  //   // console.log(`Agendamentos para ${dayISO}:`, agendamentos);

  //   return agendamentos.map(agendamento => {
  //     const horaInicio = agendamento.horaInicio ? DateTime.fromISO(agendamento.horaInicio).toFormat('HH:mm') : 'N/A';
  //     const horaFim = agendamento.horaFim ? DateTime.fromISO(agendamento.horaFim).toFormat('HH:mm') : 'N/A';

  //     return {
  //       horaInicio: horaInicio,
  //       horaFim: horaFim,
  //       assessoria: agendamento.assessoria
  //     };
  //   });
  // }

  // isAgendamentoValido(agendamento: any, day: DateTime): boolean {
  //   const agendamentosDoDia = this.getAgendamentosForDay(day);
  //   const horaInicioNovo = DateTime.fromISO(agendamento.horaInicio);
  //   const horaFimNovo = DateTime.fromISO(agendamento.horaFim);

  //   for (const ag of agendamentosDoDia) {
  //     const horaInicioExistente = DateTime.fromISO(ag.horaInicio);
  //     const horaFimExistente = DateTime.fromISO(ag.horaFim);

  //     // Verifica se o novo agendamento não está dentro do intervalo de um agendamento existente
  //     if (
  //       (horaInicioNovo < horaFimExistente && horaInicioNovo >= horaInicioExistente) ||
  //       (horaFimNovo > horaInicioExistente && horaFimNovo <= horaFimExistente)
  //     ) {
  //       return false; // Agendamento inválido
  //     }
  //   }

  //   return true; // Agendamento válido
  // }

  // openAgendamentoModal(day: DateTime | null, agendamento?: Agendamento): void {
  //   const dialogRef = this.agendamentoModalService.openAgendamentoModal(day, agendamento);

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       const dayISO = day ? day.toISODate() : DateTime.fromISO(result.data).toISODate();

  //       if (dayISO) {
  //         if (result._id) {
  //           // Atualiza o agendamento existente
  //           this.agendamentos[dayISO] = this.agendamentos[dayISO].map(ag =>
  //             ag._id === result._id ? result : ag
  //           );
  //         } else {
  //           // Adiciona como um novo agendamento
  //           this.agendamentos[dayISO] = [...(this.agendamentos[dayISO] || []), result];
  //         }
  //         this.snackBar.open('Agendamento salvo com sucesso!', '', { duration: 5000 });
  //       }
  //     }
  //   });
  // }


//   openAgendamentoModal(day: DateTime | null, agendamento?: Agendamento): void {
//     const dialogRef = this.agendamentoModalService.openAgendamentoModal(day, agendamento);

//     dialogRef.afterClosed().subscribe(result => {
//         if (result) {
//             const dayISO = day ? day.toISODate() : DateTime.fromISO(result.data).toISODate();

//             if (dayISO) {
//                 if (result._id) {
//                     // Atualiza o agendamento existente
//                     this.agendamentos[dayISO] = this.agendamentos[dayISO].map(ag =>
//                         ag._id === result._id ? result : ag
//                     );
//                 } else {
//                     // Adiciona como novo agendamento
//                     this.agendamentos[dayISO] = [...(this.agendamentos[dayISO] || []), result];
//                 }
//                 this.snackBar.open('Agendamento salvo com sucesso!', '', { duration: 5000 });
//             }
//         }
//     });
// }



  // Modifique o método para aceitar apenas o agendamento
  // onEditAgendamento(agendamento: Agendamento): void {
  //   if (agendamento.data) {
  //       const day = DateTime.fromISO(agendamento.data); // Extrai a data do agendamento
  //       this.openAgendamentoModal(day, agendamento); // Chama o modal com a data e o agendamento
  //   } else {
  //       console.error('A data do agendamento está indefinida.');
  //       // Aqui você pode definir um comportamento padrão, como atribuir a data atual
  //       const day = DateTime.local();
  //       this.openAgendamentoModal(day, agendamento);
  //   }





  // Novo método para escutar o evento de edição
  // onEditAgendamento(diaAtivo: DateTime | null, agendamento: Agendamento): void {
  //   const dialogRef = this.agendamentoModalService.openAgendamentoModal(null, agendamento);

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     // Atualizar os agendamentos após edição
    //   }
    // });
  // }
}

