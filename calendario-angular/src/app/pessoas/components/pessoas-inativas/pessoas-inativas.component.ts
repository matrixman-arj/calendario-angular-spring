import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostoGraduacaoList, PostoGraduacao } from '../../../enums/PostoGraduacao/PostoGraduacao';
import { TipoAcessoList, TipoAcesso } from '../../../enums/TipoAcesso';
import { Pessoa } from '../../model/pessoa';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatTableModule } from '@angular/material/table';
import { PessoasService } from '../../services/pessoas.service';
import { PessoaPage } from '../../model/pessoa-page';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pessoas-inativas',
  standalone: true,
  imports: [MatCard, MatTable, MatColumnDef, CommonModule,
            MatHeaderCellDef, MatHeaderCell,  MatTableModule,
            MatPaginatorModule, MatCellDef, MatCell, MatIcon,
            MatIconButton, MatHeaderRowDef, MatCardModule,
            MatButtonModule, MatHeaderRow, MatRowDef, MatRow],
  templateUrl: './pessoas-inativas.component.html',
  styleUrl: './pessoas-inativas.component.scss'
})
export class PessoasInativasComponent {

  @Input() pessoasInativas: Pessoa[] = []; // Lista para armazenar as pessoas inativas
  @Input() pessoas: Pessoa[] = []; // Lista para armazenar as pessoas inativas
   @Output() add = new EventEmitter(false);
   @Output() edit = new EventEmitter(false);
   @Output() delete = new EventEmitter(false);

   totalElements: number = 0;
   pageSize: number = 10;
   pageIndex: number = 0;


   postos = PostoGraduacaoList;
   selectedPosto = PostoGraduacao.GEN_EXERCITO;


   acessos = TipoAcessoList;
   selectedAcesso: TipoAcesso | undefined;




   readonly displayedColumns = ['caminho','identidade', 'nome', 'postoGraduacao', 'nomeGuerra',  'assessoria', 'ramal', 'acoes'];


    constructor( private pessoasService: PessoasService){

     }

      // Carrega a lista de pessoas inativas do backend
  carregarPessoasInativas(): void {
    // this.pessoasService.listarInativas().subscribe({
    //   next: (data: PessoaPage) => this.pessoasInativas = data.content,
    //   error: (err: any) => console.error('Erro ao buscar pessoas inativas:', err),
    // });
  }



    ngOnInit(): void {
      this.carregarPessoasInativas();
      // Initialization logic can be added here if needed
      console.log('Pessoas-InativasComponent initialized');
    }

    // Método para reativar uma pessoa
  reativarPessoa(id: number): void {
    // this.pessoasService.reativarPessoa(id).subscribe({
    //   next: () => {
    //     alert('Pessoa reativada com sucesso!');
    //     this.carregarPessoasInativas(); // Recarrega a lista após reativação
    //   },
    //   error: (err) => console.error('Erro ao reativar pessoa:', err),
    // });
  }

  refresh(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarPessoasInativas();
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
