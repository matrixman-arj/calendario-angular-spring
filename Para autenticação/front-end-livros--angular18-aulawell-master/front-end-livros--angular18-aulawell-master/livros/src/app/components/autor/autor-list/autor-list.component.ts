import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Autor } from '../../../models/autor';
import Swal from 'sweetalert2';
import { AutorService } from '../../../services/autor.service';
import { FormsModule } from '@angular/forms';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { AutorFormComponent } from '../autor-form/autor-form.component';

@Component({
  selector: 'app-autores-list',
  standalone: true,
  imports: [FormsModule, MdbModalModule, AutorFormComponent],
  templateUrl: './autor-list.component.html',
  styleUrl: './autor-list.component.scss',
})
export class AutoresListComponent {

  @Input() modoAssociacao: boolean = false;
  @Output() retorno = new EventEmitter<any>();

  modalService = inject(MdbModalService); // ABRE MODAIS
  @ViewChild('modalAutoresForm') modalAutoresForm!: TemplateRef<any>; //enxergar o template da modal q tá no html
  modalRef!: MdbModalRef<any>; //a referÊncia da modal aberta para ser fechada

  autorEdit!: Autor; //esse objeto será utilizado para transportar o autor clicado no botão editar

  pesquisa: string = '';

  lista: Autor[] = [];

  autoresService = inject(AutorService);

  constructor() {
    this.findAll();
  }

  findByNome() {
    this.autoresService.findByNome(this.pesquisa).subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        alert('Deu erro');
      },
    });
  }

  findAll() {
    this.autoresService.findAll().subscribe({
      next: (list) => {
        //EQUIVALENTE AO TRY CONCLUÍDO NO BACK
        this.lista = list;
      },
      error: (erro) => {
        //EQUIVALENTE AO RETORNO DE ERRO DO BACK... CATCH OU EXCEPTION
        alert('Deu erro');
      },
    });
  }

  deleteById(autor: Autor) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar o autor ' + autor.nome + '?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.autoresService.delete(autor.id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.findAll();
          },
          error: (erro) => {
            alert('Deu erro');
          },
        });
      }
    });
  }

  novo() {
    this.autorEdit = new Autor();
    this.modalRef = this.modalService.open(this.modalAutoresForm);
  }

  editar(autor: Autor) {
    //this.autorEdit = autor;
    this.autorEdit = Object.assign({}, autor); //CLONE DO OBJETO
    this.modalRef = this.modalService.open(this.modalAutoresForm);
  }

  retornoForm(mensagem: string) {
    //acionado quando houver um evento salvar ou editar do FORM que está aberto na modal

      this.modalRef.close(); //FECHOU A MODAL

    Swal.fire({ //EXIBE A MENSAGEM Q FOI ENVIADA PELO FORM (QUE RECEBEU DO BACK)
      title: mensagem,
      icon: 'success',
    });

    this.findAll(); //RECARREGO A LISTA (NUNCA UTILZIEM RELOAD OU REFRESH DA PÁGINA INTEIRA)
  }


  selecionar(autor: Autor){
    //EMITIR UM EVENTO PARA ENVIAR O AUTOR SELECIONADO PARA A MODAL DE TRÁS
    this.retorno.emit(autor);
  }

}
