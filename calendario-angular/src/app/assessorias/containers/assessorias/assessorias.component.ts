import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Assessoria } from '../../model/assessoria';
import { AssessoriasService } from '../../services/assessorias.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfimationDialogComponent } from '../../../shared/components/error-dialog/confimation-dialog/confimation-dialog.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AssessoriaListaComponent } from '../../components/assessorias-lista/assessorias-lista.component';
import { AsyncPipe } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard } from '@angular/material/card';
import { AssessoriaPage } from '../../model/assessoria-page';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@Component({
    selector: 'app-assessorias',
    templateUrl: './assessorias.component.html',
    styleUrl: './assessorias.component.scss',
    standalone: true,
    imports: [MatCard, MatToolbar, AssessoriaListaComponent, MatProgressSpinner, MatPaginator,  MatFormFieldModule, MatInputModule, MatSelectModule, AsyncPipe]
})
export class AssessoriasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

  assessorias$!: Observable<Assessoria[]>;
  assessorias2$!: Observable<AssessoriaPage>;

  assessorias: Assessoria[] = [];

  assessoriasOriginais: Assessoria[] = [];

  // pessoasService: PessoasService;

  constructor(
    private assessoriasService: AssessoriasService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute

  ){
    this.refresh2();

    this.assessoriasService.list().subscribe((data: Assessoria[]) => {
      this.assessorias = data;
     });
  }

    refresh(){
    this.assessorias$ = this.assessoriasService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar assessorias');
        return of([])
      })
    );
  }

  refresh2(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10} , termo = ''){
    this.assessorias2$ = this.assessoriasService.list2(termo, pageEvent.pageIndex, pageEvent.pageSize)
    .pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;

      }),
      catchError(error => {
        this.onError('Erro ao carregar assessorias');
        return of({ assessorias: [], content: [], totalElements: 0, totalPages: 0 } )
      })
    );
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // this.search(); // Recarrega os dados da nova página
  }

  onSearchTermChange(value: string): void {
    if (value === '') {
      // Restaura a tabela ao estado inicial
      this.refresh2({ length: 0, pageIndex: 0, pageSize: this.pageSize }, '');
    } else {
      // Aplica o filtro
      this.refresh2({ length: 0, pageIndex: 0, pageSize: this.pageSize }, value);
    }
  }

  filterSelectDeAssessorias(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    // Verifica se o valor do input está vazio
    if (value.trim() === '') {
      // Restaura a lista original de pessoas
      this.assessorias = [...this.assessoriasOriginais];
    } else {
      // Filtra os itens com base no termo digitado
      this.assessorias = this.assessoriasOriginais.filter(assessoria =>
        assessoria.sigla.toLowerCase().includes(value.toLowerCase())
      );
    }
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
    this.assessoriasService.list().subscribe((data: Assessoria[]) => {
      this.assessorias = data;
      this.assessoriasOriginais = [...data]; // Clona os dados originais
    });


  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(assessoria: Assessoria) {
    this.router.navigate(['edit', assessoria._id], {relativeTo: this.route});
    this.refresh();
    }

    onRemove(assessoria: Assessoria) {

    const dialogRef = this.dialog.open(ConfimationDialogComponent, {
      data: 'Tem certeza quanto a remoção dessa assessoria?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result){
        this.assessoriasService.remove(assessoria._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Assessoria removida com sucesso!', 'X', {
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
