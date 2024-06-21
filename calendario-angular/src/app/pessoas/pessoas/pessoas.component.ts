import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { Pessoa } from '../model/pessoa';
import { PessoasService } from '../services/pessoas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.scss'
})
export class PessoasComponent implements OnInit {

  pessoas$: Observable<Pessoa[]>;
  displayedColumns = ['foto','identidade', 'nome', 'nomeGuerra', 'postoGraduacao', 'assessoria', 'ramal', 'acoes'];

  // pessoasService: PessoasService;

  constructor(
    private pessoasService: PessoasService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute


  ){

    this.pessoas$ = this.pessoasService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar pssoas');
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

}
