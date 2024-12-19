import { Component, OnInit } from '@angular/core';
import { PessoasService } from '../../services/pessoas.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pessoa } from '../../model/pessoa';
import { AsyncPipe } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { PessoasListaComponent } from '../pessoas-lista/pessoas-lista.component';
import { MatTableModule } from '@angular/material/table';
import { PostoGraduacao, PostoGraduacaoList } from '../../../enums/PostoGraduacao/PostoGraduacao';

@Component({
  selector: 'app-pessoas-inativas',
  templateUrl: './pessoas-inativas.component.html',
  styleUrls: ['./pessoas-inativas.component.scss'],
  standalone: true,
      imports: [MatCard, MatToolbar, PessoasListaComponent, MatPaginator, MatTableModule, MatProgressSpinner, AsyncPipe, MatFormFieldModule, MatInputModule, MatSelectModule]
})
export class PessoasInativasComponent implements OnInit {
  pessoasInativas: Pessoa[] = [];
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  readonly displayedColumns = ['identidade', 'nome', 'postoGraduacao', 'nomeGuerra', 'acoes'];

  postos = PostoGraduacaoList;
   selectedPosto = PostoGraduacao.GEN_EXERCITO;

  constructor(private pessoasService: PessoasService) {}

  ngOnInit(): void {
    this.carregarPessoasInativas();
  }

  carregarPessoasInativas(): void {
    this.pessoasService.listarInativas(this.pageIndex, this.pageSize).subscribe({
      next: (data) => {
        this.pessoasInativas = data.pessoas;
        this.totalElements = data.totalElements;
      },
      error: (err) => console.error('Erro ao carregar pessoas inativas', err),
    });
  }

  reativarPessoa(id: number): void {
    this.pessoasService.reativarPessoa(id).subscribe({
      next: () => {
        alert('Pessoa reativada com sucesso!');
        this.carregarPessoasInativas(); // Recarrega a lista
      },
      error: (err) => console.error('Erro ao reativar pessoa', err),
    });
  }

  refresh(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarPessoasInativas();
  }

  getPostoImage(postoGraduacao: string): string {
      const posto = PostoGraduacaoList.find(p => p.viewValue === postoGraduacao);
      return posto ? posto.imageUrl : '';
    }
}
