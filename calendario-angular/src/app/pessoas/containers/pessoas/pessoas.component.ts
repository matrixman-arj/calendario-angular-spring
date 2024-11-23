import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Pessoa } from '../../model/pessoa';
import { PessoasService } from '../../services/pessoas.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfimationDialogComponent } from '../../../shared/components/error-dialog/confimation-dialog/confimation-dialog.component';
import { PessoaPage } from '../../model/pessoa-page';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { PessoasListaComponent } from '../../components/pessoas-lista/pessoas-lista.component';
import { AsyncPipe } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard } from '@angular/material/card';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PostoGraduacaoList } from '../../../enums/PostoGraduacao/PostoGraduacao';
import { MatSelectModule } from '@angular/material/select';
import { UntypedFormGroup } from '@angular/forms';
import { AssessoriasService } from '../../../assessorias/services/assessorias.service';
import { Assessoria } from '../../../assessorias/model/assessoria';

@Component({
    selector: 'app-pessoas',
    templateUrl: './pessoas.component.html',
    styleUrl: './pessoas.component.scss',
    standalone: true,
    imports: [MatCard, MatToolbar, PessoasListaComponent, MatPaginator, MatProgressSpinner, AsyncPipe, MatFormFieldModule, MatInputModule, MatSelectModule]
})
export class PessoasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

  termo = '';

  postos = PostoGraduacaoList;

  @Input() dataSource = new MatTableDataSource<Pessoa>();
  // page = 0; // Página inicial
  // size = 10; // Itens por página
  // termo = '';
  // totalElements = 0; // Total de elementos no banco de dados

  pessoas$: Observable<PessoaPage> | null = null;
  pessoas: Pessoa[] = [];

  assessorias: Assessoria[] = [];

  form: UntypedFormGroup | undefined;



  // pessoas$!: Observable<PessoaPage | { content: never[]; totalElements: number; totalPages: number; }>;

  // pessoasService: PessoasService;

  constructor(
    private readonly pessoasService: PessoasService,
    private readonly assessoriasService: AssessoriasService,

    public dialog: MatDialog,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly route: ActivatedRoute,



  ){
    this.refresh();

    // this.pessoas.sort((a, b) => a.postoGraduacao.localeCompare(b.postoGraduacao));

    this.pessoasService.listPessCompl().subscribe((data: Pessoa[]) => {
      this.pessoas = data;
     });

     this.assessoriasService.list().subscribe((data: Assessoria[]) => {
      this.assessorias = data;
     });
   }



   // Escutar mudanças no campo 'pessoa'
onPessoaChange(pessoaId: string): void {
  // Encontre a pessoa selecionada a partir da lista de pessoas
  const selectedPessoa = this.pessoas.find(pessoa => pessoa._id === pessoaId);

  // Se a pessoa tiver uma assessoria associada, atualize o campo 'assessoria'
  if (selectedPessoa && selectedPessoa.assessoria) {

  }
}

onSearchTermChange(value: string): void {
  if (value === '') {
    // Restaura a tabela ao estado inicial
    this.refresh({ length: 0, pageIndex: 0, pageSize: this.pageSize }, '');
  } else {
    // Aplica o filtro
    this.refresh({ length: 0, pageIndex: 0, pageSize: this.pageSize }, value);
  }
}

// onSearchTermChange(termoOuEvento: any): void {
//   let termo: string;

//   // Verifica se o parâmetro é um evento de teclado (input) ou um valor direto (select)
//   if (typeof termoOuEvento === 'string') {
//     termo = termoOuEvento;
//   } else {
//     const inputElement = termoOuEvento.target as HTMLInputElement;
//     termo = inputElement.value || '';
//   }

//   // Realiza a pesquisa com o termo fornecido
//   this.refresh({ length: 0, pageIndex: 0, pageSize: this.pageSize }, termo);
// }


  //  onSearchTermChange(event: any) {
  //   const inputElement = event.target as HTMLInputElement;
  //   const termo = inputElement.value || '';
  //   this.refresh({ length: 0, pageIndex: 0, pageSize: this.pageSize }, termo);
  // }


   refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10} , termo = '') {
    this.pessoas$ = this.pessoasService.list(termo, pageEvent.pageIndex, pageEvent.pageSize)
    .pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;

      }),
        catchError ( error => {
        this.onError('Erro ao carregar pessoas');
        return of({content: [], pessoas: [], totalElements: 0, totalPages: 10 })
      })
    );
  }


   onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // this.search(); // Recarrega os dados da nova página
  }

  // search(): void {
  //   this.pessoasService.list(this.termo || '', this.page, this.size).subscribe(
  //     (response) => {
  //       this.dataSource.data = response.content; // Atualiza os dados da tabela
  //       this.totalElements = response.totalElements; // Atualiza o total de elementos
  //     },
  //     (error) => {
  //       console.error('Erro ao buscar pessoas:', error);
  //     }
  //   );
  // }

  // refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10}){
  //   this.pessoas$ = this.pessoasService.list(pageEvent.pageIndex, pageEvent.pageSize)
  //   .pipe(
  //     tap(() => {
  //       this.pageIndex = pageEvent.pageIndex;
  //       this.pageSize = pageEvent.pageSize;
  //     }),
  //     catchError(error => {

  //       this.onError('Erro ao carregar pessoas');
  //       return of({content: [], totalElements: 0, totalPages: 0 })
  //     })
  //   );

  // }

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
