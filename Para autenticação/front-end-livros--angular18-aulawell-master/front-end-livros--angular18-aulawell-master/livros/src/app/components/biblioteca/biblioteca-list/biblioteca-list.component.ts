import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Biblioteca } from '../../../models/biblioteca';
import Swal from 'sweetalert2';
import { BibliotecaService } from '../../../services/biblioteca.service';
import { FormsModule } from '@angular/forms';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { BibliotecaFormComponent } from '../biblioteca-form/biblioteca-form.component';

@Component({
  selector: 'app-bibliotecas-list',
  standalone: true,
  imports: [FormsModule, MdbModalModule, BibliotecaFormComponent],
  templateUrl: './biblioteca-list.component.html',
  styleUrl: './biblioteca-list.component.scss',
})
export class BibliotecaListComponent {
  modalService = inject(MdbModalService); // ABRE MODAIS
  @ViewChild('modalBibliotecasForm') modalBibliotecasForm!: TemplateRef<any>; //enxergar o template da modal q tá no html
  modalRef!: MdbModalRef<any>; //a referÊncia da modal aberta para ser fechada

  bibliotecaEdit!: Biblioteca; //esse objeto será utilizado para transportar o biblioteca clicado no botão editar

  pesquisa: string = '';

  lista: Biblioteca[] = [];

  bibliotecasService = inject(BibliotecaService);

  @Input() modoAssociacao: boolean = false;
  @Output() retorno = new EventEmitter();



  constructor() {
    this.findAll();
  }

  findByNome() {
    this.bibliotecasService.findByNome(this.pesquisa).subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        alert('Deu erro');
      },
    });
  }

  findAll() {
    this.bibliotecasService.findAll().subscribe({
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

  deleteById(biblioteca: Biblioteca) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar o biblioteca ' + biblioteca.nome + '?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.bibliotecasService.delete(biblioteca.id).subscribe({
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
    this.bibliotecaEdit = new Biblioteca();
    this.modalRef = this.modalService.open(this.modalBibliotecasForm);
  }

  editar(biblioteca: Biblioteca) {
    //this.bibliotecaEdit = biblioteca;
    this.bibliotecaEdit = Object.assign({}, biblioteca); //CLONE DO OBJETO
    this.modalRef = this.modalService.open(this.modalBibliotecasForm);
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


  selecionar(biblioteca: Biblioteca){
    //EMITIR UM EVENTO PARA ENVIAR O AUTOR SELECIONADO PARA A MODAL DE TRÁS
    this.retorno.emit(biblioteca);
  }
}
