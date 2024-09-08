import { Component, OnInit } from '@angular/core';
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

  agendamentos$!: Observable<Agendamento[]>;


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

}
