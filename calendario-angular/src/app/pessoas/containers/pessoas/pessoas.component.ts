import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Pessoa } from '../../model/pessoa';
import { PessoasService } from '../../services/pessoas.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfimationDialogComponent } from '../../../shared/components/error-dialog/confimation-dialog/confimation-dialog.component';
import { PessoaPage } from '../../model/pessoa-page';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { PessoasListaComponent } from '../../components/pessoas-lista/pessoas-lista.component';
import { AsyncPipe } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard } from '@angular/material/card';

@Component({
    selector: 'app-pessoas',
    templateUrl: './pessoas.component.html',
    styleUrl: './pessoas.component.scss',
    standalone: true,
    imports: [MatCard, MatToolbar, PessoasListaComponent, MatPaginator, MatProgressSpinner, AsyncPipe]
})
export class PessoasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

  pessoas$!: Observable<PessoaPage>;

  // pessoasService: PessoasService;

  constructor(
    private pessoasService: PessoasService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,


  ){
    this.refresh();
   }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10}){
    this.pessoas$ = this.pessoasService.list(pageEvent.pageIndex, pageEvent.pageSize)
    .pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError(error => {

        this.onError('Erro ao carregar pessoas');
        return of({pessoas: [], totalElements: 0, totalPages: 0 })
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

  onEdit(pessoa: Pessoa) {
    this.router.navigate(['edit', pessoa._id], {relativeTo: this.route});
    this.refresh();
    }

  // onEdit(pessoa: Pessoa) {
  //   this.refresh();

  //   console.log('Pessoa para editar:', pessoa); // Adicione este log
  //   console.log('ID da pessoa:', pessoa._id);   // Adicione este log

  //   if (pessoa._id) {
  //     this.router.navigate(['edit', pessoa._id], { relativeTo: this.route });
  //   } else {
  //     console.error('Erro: pessoa._id é indefinido ou nulo.', pessoa);
  //     // Exiba uma mensagem de erro ou tome outra ação apropriada
  //   }
  // }


  onRemove(pessoa: Pessoa) {

    const dialogRef = this.dialog.open(ConfimationDialogComponent, {
      data: 'Tem certeza quanto a remoção dessa pessoa?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result){
        this.pessoasService.remove(pessoa._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Pessoa removida com sucesso!', 'X', {
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
