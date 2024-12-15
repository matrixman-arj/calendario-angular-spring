import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Livro } from '../../../models/livro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LivrosService } from '../../../services/livros.service';
import { AutoresListComponent } from '../../autor/autor-list/autor-list.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Autor } from '../../../models/autor';
import { BibliotecaListComponent } from '../../biblioteca/biblioteca-list/biblioteca-list.component';
import { Biblioteca } from '../../../models/biblioteca';

@Component({
  selector: 'app-livros-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, AutoresListComponent, BibliotecaListComponent],
  templateUrl: './livros-form.component.html',
  styleUrl: './livros-form.component.scss'
})
export class LivrosFormComponent {

  modalService = inject(MdbModalService); // ABRE MODAIS
  @ViewChild('modalAutorList') modalAutorList!: TemplateRef<any>; //enxergar o template da modal q tá no html
  @ViewChild('modalBibliotecaList') modalBibliotecaList!: TemplateRef<any>; //enxergar o template da modal q tá no html
  modalRef!: MdbModalRef<any>; //a referÊncia da modal aberta para ser fechada


  tituloComponente: string = "Novo livro";

  @Input() livro: Livro = new Livro();
  autores: Autor[] = [];

  @Output() retorno = new EventEmitter();

  router = inject(Router);
  rotaAtivada = inject(ActivatedRoute);

  livrosService = inject(LivrosService);

  constructor(){
    let id = this.rotaAtivada.snapshot.params['id'];
    if(id > 0){
      //this.modoNovo = false; //
      this.tituloComponente = "Editar livro";   
      this.findById(id);
    }
  }


  findById(id: number){
    
    this.livrosService.findById(id).subscribe({
      next: liv => {
        this.livro = liv;
      },
      error: erro => {
        alert('Deu erro');
      }
    })

  }



  save(){

    this.livrosService.save(this.livro).subscribe({
      next: mensagem => {

        this.retorno.emit(mensagem);

      },
      error: erro => {
        alert('Deu erro');
      }
    });


  }

  update(){


    this.livrosService.update(this.livro).subscribe({
      next: mensagem =>{
        
        this.retorno.emit(mensagem);

      },
      error: erro =>{
        alert('Deu erro');
      }
    });
  }


  abrirModalLivros(){
    this.modalRef =   this.modalService.open(this.modalAutorList, {modalClass:'modal-xl'});
  }

  abrirModalBiblioteca(){
    this.modalRef =   this.modalService.open(this.modalBibliotecaList, {modalClass:'modal-xl'});
  }

  bibliotecaSelecionada(biblioteca: Biblioteca){
    this.livro.biblioteca = biblioteca;

    this.modalRef.close();
  }

  autorSelecionado(autor: Autor){
    if(this.livro.autores == null)
      this.livro.autores = [];

    this.livro.autores.push(autor);

    this.modalRef.close();
  }

  removerAutor(autor: Autor){
    let indice = this.livro.autores.findIndex( (aut) => {return aut.id == autor.id } );
    this.livro.autores.splice(indice,1);
  }

}
