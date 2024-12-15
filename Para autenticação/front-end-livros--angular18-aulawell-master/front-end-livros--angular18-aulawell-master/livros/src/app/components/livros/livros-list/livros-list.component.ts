import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Livro } from '../../../models/livro';
import Swal from 'sweetalert2';
import { LivrosService } from '../../../services/livros.service';
import { FormsModule } from '@angular/forms';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { LivrosFormComponent } from '../livros-form/livros-form.component';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../../../models/page';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-livros-list',
  standalone: true,
  imports: [FormsModule, MdbModalModule, LivrosFormComponent, NgbPaginationModule],
  templateUrl: './livros-list.component.html',
  styleUrl: './livros-list.component.scss',
})
export class LivrosListComponent {
  modalService = inject(MdbModalService); // ABRE MODAIS
  @ViewChild('modalLivrosForm') modalLivrosForm!: TemplateRef<any>; //enxergar o template da modal q tá no html
  modalRef!: MdbModalRef<any>; //a referÊncia da modal aberta para ser fechada

  livroEdit!: Livro; //esse objeto será utilizado para transportar o livro clicado no botão editar

  pesquisa: string = '';

  lista: Livro[] = [];
  pagina: number = 1;
  maximo: number = 5;
  pageObj!: Page;

  livrosService = inject(LivrosService);
  router = inject(ActivatedRoute);

  constructor() {

    let page = this.router.snapshot.params['page'];
    if(page){
      this.pagina = page;
    }
    this.findByTitulo();
  }

  findByTitulo() {
    this.livrosService.findByTitulo(this.pesquisa, this.pagina).subscribe({
      next: (page) => {
        this.lista = page.content;
        this.pageObj = page;
      },
      error: (erro) => {
        alert('Deu erro');
      },
    });
  }

  /*findAll() {
    this.livrosService.findAll(this.pagina).subscribe({
      next: (pagina) => {
        //EQUIVALENTE AO TRY CONCLUÍDO NO BACK
        this.lista = pagina.content;
        this.pageObj = pagina;
      },
      error: (erro) => {
        //EQUIVALENTE AO RETORNO DE ERRO DO BACK... CATCH OU EXCEPTION
        alert('Deu erro');
      },
    });
  }*/

  deleteById(livro: Livro) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar o livro ' + livro.titulo + '?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.livrosService.delete(livro.id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.findByTitulo();
          },
          error: (erro) => {
            alert('Deu erro');
          },
        });
      }
    });
  }

  novo() {
    this.livroEdit = new Livro();
    this.modalRef = this.modalService.open(this.modalLivrosForm, {modalClass: "modal-lg"});
  }

  editar(livro: Livro) {
    //this.livroEdit = livro;
    this.livroEdit = Object.assign({}, livro); //CLONE DO OBJETO
    this.modalRef = this.modalService.open(this.modalLivrosForm,  {modalClass: "modal-lg"});
  }

  retornoForm(mensagem: string) {
    //acionado quando houver um evento salvar ou editar do FORM que está aberto na modal

      this.modalRef.close(); //FECHOU A MODAL

    Swal.fire({ //EXIBE A MENSAGEM Q FOI ENVIADA PELO FORM (QUE RECEBEU DO BACK)
      title: mensagem,
      icon: 'success',
    });

    this.findByTitulo(); //RECARREGO A LISTA (NUNCA UTILZIEM RELOAD OU REFRESH DA PÁGINA INTEIRA)
  }
}
