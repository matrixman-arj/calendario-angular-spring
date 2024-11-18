import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { Pessoa } from '../../model/pessoa';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { PostoGraduacao, PostoGraduacaoList } from '../../../enums/PostoGraduacao/PostoGraduacao';
import { TipoAcesso, TipoAcessoList } from '../../../enums/TipoAcesso';

import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton, MatIconButton, MatButton } from '@angular/material/button';

import { MatCard } from '@angular/material/card';
import { PessoasService } from '../../services/pessoas.service';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-pessoas-lista',
    templateUrl: './pessoas-lista.component.html',
    styleUrl: './pessoas-lista.component.scss',
    standalone: true,
    imports: [MatCard, MatTable, MatColumnDef,
              MatHeaderCellDef, MatHeaderCell,
              MatCellDef, MatCell, MatIcon,
              MatIconButton, MatHeaderRowDef,
              MatHeaderRow, MatRowDef, MatRow,
              MatFormField, MatInput]
})
export class PessoasListaComponent implements OnInit {



 @Input() pessoas: Pessoa[] = [];
 @Output() add = new EventEmitter(false);
 @Output() edit = new EventEmitter(false);
 @Output() delete = new EventEmitter(false);
 dataSource = new MatTableDataSource<Pessoa>();

 @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

 ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
 }

 ngOnChanges() {
  this.dataSource.data = this.pessoas; // Atualiza os dados do MatTableDataSource
}


 postos = PostoGraduacaoList;
 selectedPosto = PostoGraduacao.GEN_EXERCITO;


 acessos = TipoAcessoList;
 selectedAcesso: TipoAcesso | undefined;




  readonly displayedColumns = ['caminho','identidade', 'nome', 'nomeGuerra', 'postoGraduacao', 'assessoria', 'ramal', 'acoes'];

  page = 0; // Página inicial
  size = 10; // Itens por página
  termo = '';

  totalElements = 0; // Total de elementos no banco de dados


onPageChange(event: PageEvent): void {
  this.page = event.pageIndex;
  this.size = event.pageSize;
  this.search(); // Recarrega os dados da nova página
}


  constructor(
    private http: HttpClient,
    private pessoasService: PessoasService
    // private shared: /* TODO(standalone-migration): clean up removed NgModule reference manually. */  SharedModule


   ){

   }



  ngOnInit(): void {
    // this.http.get<Pessoa[]>('/api/pessoas').subscribe(data => {
    //   this.dataSource.data = data;


    // });

    this.atualizarDataSource();

    this.search();

    this.dataSource.data = this.pessoas; // Inicializa os dados no DataSource


  }

  // ngOnChanges() {
  //   // Sempre que o array de pessoas mudar, atualize o DataSource
  //   this.atualizarDataSource();
  // }


  atualizarDataSource() {
    this.dataSource.data = this.pessoas;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator; // Conectando paginação ao DataSource
    }
  }

  aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase(); // Configurar o filtro

    this.dataSource.filterPredicate = (data: Pessoa, filter: string) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.includes(filter);
    };
  }



  search(): void {
    this.pessoasService.list(this.termo || '', this.page, this.size).subscribe(
      (response) => {
        this.dataSource.data = response.content; // Atualiza os dados da tabela
        this.totalElements = response.totalElements; // Atualiza o total de elementos
      },
      (error) => {
        console.error('Erro ao buscar pessoas:', error);
      }
    );
  }


  onSearchTermChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const term = inputElement.value;
    this.termo = term;
    this.page = 0; // Reinicia a paginação
    this.search();
  }


  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = 'http://localhost:8080/media/branco.jpg';
  }

  onAdd(){
    this.add.emit(true);

  }

  onEdit(pessoa: Pessoa ){
    this.edit.emit(pessoa);
  }

  onDelete(pessoa: Pessoa){
    this.delete.emit(pessoa);

  }

  getPostoImage(postoGraduacao: string): string {
    const posto = PostoGraduacaoList.find(p => p.viewValue === postoGraduacao);
    return posto ? posto.imageUrl : '';
  }

}
