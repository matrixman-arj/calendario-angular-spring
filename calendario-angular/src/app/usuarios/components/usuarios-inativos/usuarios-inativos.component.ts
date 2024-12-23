import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Usuario } from '../../model/usuario';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { UsuariosListaComponent } from '../usuarios-lista/usuarios-lista.component';
import { MatTableModule } from '@angular/material/table';
import { PostoGraduacao, PostoGraduacaoList } from '../../../enums/PostoGraduacao/PostoGraduacao';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-usuarios-inativos',
  templateUrl: './usuarios-inativos.component.html',
  styleUrls: ['./usuarios-inativos.component.scss'],
  standalone: true,
      imports: [MatCard, MatToolbar, UsuariosListaComponent,
                MatPaginator, MatTableModule, MatProgressSpinner,
                AsyncPipe, MatFormFieldModule, MatInputModule, MatSelectModule,
                CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule,
                MatCardModule, MatToolbarModule  ]
})
export class UsuariosInativosComponent implements OnInit {
  usuariosInativas: Usuario[] = [];
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  readonly displayedColumns = ['identidade', 'nome', 'postoGraduacao', 'nomeGuerra', 'acoes'];

  postos = PostoGraduacaoList;
   selectedPosto = PostoGraduacao.GEN_EXERCITO;

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.carregarUsuariosInativas();
  }

  carregarUsuariosInativas(): void {
    this.usuariosService.listarInativas(this.pageIndex, this.pageSize).subscribe({
      next: (data) => {
        this.usuariosInativas = data.usuarios;
        this.totalElements = data.totalElements;
      },
      error: (err) => console.error('Erro ao carregar usuarios inativas', err),
    });
  }

  reativarUsuario(id: number | undefined): void {
    if (!id) {
      console.error('ID inválido para reativação:', id);
      return;
    }

    this.usuariosService.reativarUsuario(id).subscribe({
      next: () => {
        alert('Usuario reativada com sucesso!');
        this.carregarUsuariosInativas(); // Recarrega a lista após reativação
      },
      error: (err) => console.error('Erro ao reativar usuario:', err),
    });
  }


  refresh(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarUsuariosInativas();
  }

  getPostoImage(postoGraduacao: string): string {
      const posto = PostoGraduacaoList.find(p => p.viewValue === postoGraduacao);
      return posto ? posto.imageUrl : '';
    }
}
