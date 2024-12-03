import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Auditorio } from '../../modelo/Auditorio';

import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { DateTime } from 'luxon';
import { AuditorioModalComponent } from '../../containers/auditorio-form/auditorio-modal/auditorio-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AuditoriosService } from '../../services/auditorios.service';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton, MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';


@Component({
    selector: 'app-auditorios-lista',
    templateUrl: './auditorios-lista.component.html',
    styleUrl: './auditorios-lista.component.scss',
    standalone: true,
    imports: [MatCard, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatMiniFabButton, MatIcon, MatIconButton, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow]
})
export class AuditoriosListaComponent implements OnInit {

  auditorios$!: Observable<Auditorio[]>;

  diaAtivo: DateTime | null = null; // Defina a propriedade diaAtivo aqui
  @Input() auditorios2: { [key: string]: Auditorio[] } = {}; // Inicializa com um objeto vazio
  @Input() auditorios: Auditorio[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter<Auditorio>(); // Mudança aqui para passar o auditorio
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ['dataInicio', 'dataFim' ,'horaInicio', 'horaFim', 'pessoa', 'assessoria', 'acoes'];


  dataSource = new MatTableDataSource<Auditorio>();
  dateHoje: string | undefined;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    private  readonly auditoriosService: AuditoriosService
  ) { }


  ngOnInit(): void {

    this.dataSource.data = this.auditorios;

    // this.http.get<Auditorio[]>('/api/auditorios').subscribe(data => {
    //   this.dataSource.data = data;
    //   console.log(data)
    // });


  }

  onAdd(){
    this.add.emit(true);
  }


   //Novo método para escutar o evento de edição
  onEdit(auditorio: Auditorio): void {
    console.log(auditorio.id)
    if (auditorio.dataInicio) {
        const day = DateTime.fromISO(auditorio.dataInicio); // Mantém como DateTime
        // const day = DateTime.local(); // Usa a data atual como DateTime
        this.openAuditorioModal(day, auditorio); // Chama o modal com o DateTime e o auditorio

    } else {
        console.error('A data do auditorio está indefinida.');
        // Define um comportamento padrão, como atribuir a data atual
        const day = DateTime.local(); // Usa a data atual como DateTime
        this.openAuditorioModal(day, auditorio);
    }
}

openAuditorioModal(day: DateTime, auditorio?: Auditorio): void {
  // Se o auditorio for passado, abrir o modal preenchido para edição
  if (auditorio) {
    const dialogRef = this.dialog.open(AuditorioModalComponent, {
      width: '600px',
      data: {
        date: day.toISODate(),
        auditorio: auditorio  // Passa o auditorio para ser editado
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Atualiza o auditorio existente
        Object.assign(auditorio, result);
        this.auditoriosService.save(auditorio).subscribe(() => {
          this.refresh();
          this.refreshCalendar();

        });
      }
    });
  } else {
    // Se não houver auditorio, abrir o modal vazio para criar um novo auditorio
    const dialogRef = this.dialog.open(AuditorioModalComponent, {
      width: '600px',
      data: {
        date: day.toISODate(),
        auditorio: null  // Passa null para indicar que é um novo auditorio
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Adiciona o novo auditorio
        this.auditoriosService.save(result).subscribe(() => {
          this.refresh();
          this.refreshCalendar();
        });
      }
    });
  }
}

// openAuditorioModal(day: DateTime, auditorio?: any): void {
//   const dateOnly = day.startOf('day');

//   const dataToPass = {
//     date: dateOnly,
//     auditorio: auditorio || null
//   };

//   const dialogRef = this.dialog.open(AuditorioModalComponent, {
//     width: '600px',
//     data: dataToPass,
//     id: auditorio?.id // Verifica se o auditorio possui um ID
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     if (result) {
//       if (this.isAuditorioValido(result, day)) {
//         // Aqui você deve adicionar a lógica para salvar o auditorio
//         // Exemplo:
//         this.auditoriosService.list().subscribe(() => {
//           this.snackBar.open('Auditorio atualizado com sucesso!', 'Fechar', {
//             duration: 3000
//           });
//           this.refresh(); // Atualiza a lista de auditorios ao fechar o modal
//         });
//       } else {
//         this.snackBar.open('O auditorio não pode ser salvo. Existe um conflito de horário.', 'Fechar', {
//           duration: 5000
//         });
//       }
//     } else {
//       console.log('Modal fechado sem alterações.');
//     }
//   });
// }

  refreshCalendar(): void {
    this.auditoriosService.list().subscribe(auditorios => {
      this.auditorios = auditorios; // Atualiza o array de auditorios
      // Outras lógicas de atualização de calendário, se necessário
    });
  }


  refresh() {
    this.auditorios$ = this.auditoriosService.list()
      .pipe(
        catchError(error => {
          this.onError();
          return of([]); // Retorna uma lista vazia em caso de erro
        })
      );

    // Se você quiser atualizar a lista no DataSource do MatTable também:
    this.auditoriosService.list().subscribe((auditorios: Auditorio[]) => {
      this.dataSource.data = auditorios;
    });
  }



  isAuditorioValido(auditorio: any, day: DateTime): boolean {
    const auditoriosDoDia = this.getAuditoriosForDay(day);
    const horaInicioNovo = DateTime.fromISO(auditorio.horaInicio);
    const horaFimNovo = DateTime.fromISO(auditorio.horaFim);

    for (const ag of auditoriosDoDia) {
      const horaInicioExistente = DateTime.fromISO(ag.horaInicio);
      const horaFimExistente = DateTime.fromISO(ag.horaFim);

      // Verifica se o novo auditorio não está dentro do intervalo de um auditorio existente
      if (
        (horaInicioNovo < horaFimExistente && horaInicioNovo >= horaInicioExistente) ||
        (horaFimNovo > horaInicioExistente && horaFimNovo <= horaFimExistente)
      ) {
        return false; // Auditorio inválido
      }
    }

    return true; // Auditorio válido
  }

  getAuditoriosForDay(day: DateTime): any[] {
    const dayISO = day.toISODate();
    if (!dayISO) {
      return []; // Retorna uma lista vazia se dayISO for null
    }

    // Verificar e depurar se os auditorios estão sendo encontrados
    const auditorios = this.auditorios2[dayISO] || [];
    // console.log(`Auditorios para ${dayISO}:`, auditorios);
    return auditorios.map(auditorio => {
      const horaInicio = auditorio.horaInicio ? DateTime.fromISO(auditorio.horaInicio).toFormat('HH:mm') : 'N/A';
      const horaFim = auditorio.horaFim ? DateTime.fromISO(auditorio.horaFim).toFormat('HH:mm') : 'N/A';
      this.refresh();
      return {
        horaInicio: horaInicio,
        horaFim: horaFim,
        assessoria: auditorio.assessoria
      };
    });
  }

  private onError() {
    this.dialog.open(ErrorDialogComponent, {
      data: 'Erro ao tentar realisar auditorio .'
    });
  }

  onDelete(auditorio: Auditorio) {
    this.delete.emit(auditorio);
  }

}
