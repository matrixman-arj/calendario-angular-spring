import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Usuario } from '../../model/usuario';
import { UsuariosService } from '../../services/usuarios.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfimationDialogComponent } from '../../../shared/components/error-dialog/confimation-dialog/confimation-dialog.component';
import { UsuarioPage } from '../../model/usuario-page';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { UsuariosListaComponent } from '../../components/usuarios-lista/usuarios-lista.component';
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
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrl: './usuarios.component.scss',
    standalone: true,
    imports: [MatCard, MatToolbar, UsuariosListaComponent, MatPaginator, MatProgressSpinner, AsyncPipe, MatFormFieldModule, MatInputModule, MatSelectModule]
})
export class UsuariosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

  termo = '';

  postos = PostoGraduacaoList;

  @Input() dataSource = new MatTableDataSource<Usuario>();
  // page = 0; // Página inicial
  // size = 10; // Itens por página
  // termo = '';
  // totalElements = 0; // Total de elementos no banco de dados

  usuarios$: Observable<UsuarioPage> | null = null;
  usuarios: Usuario[] = [];
  usuariosOriginais: Usuario[] = []; // Array com todos os registros originais


  assessorias: Assessoria[] = [];
  assessoriasOriginais: Assessoria[] = [];

  form: UntypedFormGroup | undefined;



  // usuarios$!: Observable<UsuarioPage | { content: never[]; totalElements: number; totalPages: number; }>;

  // usuariosService: UsuariosService;

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly assessoriasService: AssessoriasService,

    public dialog: MatDialog,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly route: ActivatedRoute,



  ){
    this.refresh();

    // this.usuarios.sort((a, b) => a.postoGraduacao.localeCompare(b.postoGraduacao));

    this.usuariosService.listPessCompl().subscribe((data: Usuario[]) => {
      this.usuarios = data;
     });

     this.assessoriasService.list().subscribe((data: Assessoria[]) => {
      this.assessorias = data;
     });
   }



   // Escutar mudanças no campo 'usuario'
onUsuarioChange(usuarioId: string): void {
  // Encontre a usuario selecionada a partir da lista de usuarios
  const selectedUsuario = this.usuarios.find(usuario => usuario._id === usuarioId);

  // Se a usuario tiver uma assessoria associada, atualize o campo 'assessoria'
  if (selectedUsuario && selectedUsuario.assessoria) {
    // Add meaningful code here or remove the block if not needed
    console.log(`Selected usuario has assessoria: ${selectedUsuario.assessoria}`);
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

filterSelectDeUsuarios(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const value = inputElement.value;

  // Verifica se o valor do input está vazio
  if (value.trim() === '') {
    // Restaura a lista original de usuarios
    this.usuarios = [...this.usuariosOriginais];
  } else {
    // Filtra os itens com base no termo digitado
    this.usuarios = this.usuariosOriginais.filter(usuario =>
      usuario.nomeGuerra.toLowerCase().includes(value.toLowerCase())
    );
  }
}


// filterSelectDeUsuarios(event: Event) {
//   const inputElement = event.target as HTMLInputElement;
//   const value = inputElement.value;

//   this.usuarios = this.usuarios.filter(usuario =>
//     usuario.nomeGuerra.toLowerCase().includes(value.toLowerCase())
//     );
// if(inputElement.value == ''){
//   this.usuarios;
// }
//   }

filterSelectDeAssessorias(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const value = inputElement.value;

  // Verifica se o valor do input está vazio
  if (value.trim() === '') {
    // Restaura a lista original de usuarios
    this.assessorias = [...this.assessoriasOriginais];
  } else {
    // Filtra os itens com base no termo digitado
    this.assessorias = this.assessoriasOriginais.filter(assessoria =>
      assessoria.sigla.toLowerCase().includes(value.toLowerCase())
    );
  }
}

// filterSelectDeAssessorias(event: Event) {
//   const inputElement = event.target as HTMLInputElement;
//   const value = inputElement.value;

//   this.assessorias = this.assessorias.filter(assessoria =>
//     assessoria.sigla.toLowerCase().includes(value.toLowerCase())
//     );
//   }

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
    this.usuarios$ = this.usuariosService.list(termo, pageEvent.pageIndex, pageEvent.pageSize)
    .pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;

      }),
        catchError ( error => {
        this.onError('Erro ao carregar usuarios');
        return of({content: [], usuarios: [], totalElements: 0, totalPages: 10 })
      })
    );
  }


   onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // this.search(); // Recarrega os dados da nova página
  }

  // search(): void {
  //   this.usuariosService.list(this.termo || '', this.page, this.size).subscribe(
  //     (response) => {
  //       this.dataSource.data = response.content; // Atualiza os dados da tabela
  //       this.totalElements = response.totalElements; // Atualiza o total de elementos
  //     },
  //     (error) => {
  //       console.error('Erro ao buscar usuarios:', error);
  //     }
  //   );
  // }

  // refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10}){
  //   this.usuarios$ = this.usuariosService.list(pageEvent.pageIndex, pageEvent.pageSize)
  //   .pipe(
  //     tap(() => {
  //       this.pageIndex = pageEvent.pageIndex;
  //       this.pageSize = pageEvent.pageSize;
  //     }),
  //     catchError(error => {

  //       this.onError('Erro ao carregar usuarios');
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
    this.usuariosService.listPessCompl().subscribe((data: Usuario[]) => {
      this.usuarios = data;
      this.usuariosOriginais = [...data]; // Clona os dados originais
    });

    this.assessoriasService.list().subscribe((data: Assessoria[]) => {
      this.assessorias = data;
      this.assessoriasOriginais = [...data]; // Clona os dados originais
    });

    // this.usuariosService.listAssessCompl().subscribe((data: Assessoria[]) => {
    //   this.assessorias = data;
    //   this.assessoriasOriginais = [...data]; // Clona os dados originais
    // });
  }


  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(usuario: Usuario) {
    this.router.navigate(['edit', usuario._id], {relativeTo: this.route});
    this.refresh();
    }

  // onEdit(usuario: Usuario) {
  //   this.refresh();

  //   console.log('Usuario para editar:', usuario); // Adicione este log
  //   console.log('ID da usuario:', usuario._id);   // Adicione este log

  //   if (usuario._id) {
  //     this.router.navigate(['edit', usuario._id], { relativeTo: this.route });
  //   } else {
  //     console.error('Erro: usuario._id é indefinido ou nulo.', usuario);
  //     // Exiba uma mensagem de erro ou tome outra ação apropriada
  //   }
  // }


  onRemove(usuario: Usuario) {

    const dialogRef = this.dialog.open(ConfimationDialogComponent, {
      data: 'Tem certeza quanto a remoção dessa usuario?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result){
        this.usuariosService.remove(usuario._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Usuario removida com sucesso!', 'X', {
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
