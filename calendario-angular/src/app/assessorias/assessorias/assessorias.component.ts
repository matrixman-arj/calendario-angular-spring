import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { Assessoria } from '../model/assessoria';
import { AssessoriasService } from './services/assessorias.service';


@Component({
  selector: 'app-assessorias',
  templateUrl: './assessorias.component.html',
  styleUrl: './assessorias.component.scss'
})
export class AssessoriasComponent implements OnInit {

  assessorias$: Observable<Assessoria[]>;
  displayedColumns = ['sigla','descricao', 'acoes'];

  // pessoasService: PessoasService;

  constructor(
    private assessoriasService: AssessoriasService,
    public dialog: MatDialog

  ){

    this.assessorias$ = this.assessoriasService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar assessorias');
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

}
