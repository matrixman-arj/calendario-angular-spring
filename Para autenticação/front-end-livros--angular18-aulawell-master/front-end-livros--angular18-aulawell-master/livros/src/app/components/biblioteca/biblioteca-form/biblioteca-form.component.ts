import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Biblioteca } from '../../../models/biblioteca';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BibliotecaService } from '../../../services/biblioteca.service';

@Component({
  selector: 'app-bibliotecas-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './biblioteca-form.component.html',
  styleUrl: './biblioteca-form.component.scss'
})
export class BibliotecaFormComponent {

  tituloComponente: string = "Nova biblioteca";

  @Input() biblioteca: Biblioteca = new Biblioteca();
  @Output() retorno = new EventEmitter();
  //modoNovo: boolean = true;

  router = inject(Router);
  rotaAtivada = inject(ActivatedRoute);

  bibliotecasService = inject(BibliotecaService);

  constructor(){
    let id = this.rotaAtivada.snapshot.params['id'];
    if(id > 0){
      //this.modoNovo = false; //
      this.tituloComponente = "Editar biblioteca";   
      this.findById(id);
    }
  }


  findById(id: number){
    
    this.bibliotecasService.findById(id).subscribe({
      next: liv => {
        this.biblioteca = liv;
      },
      error: erro => {
        alert('Deu erro');
      }
    })

  }



  save(){

    this.bibliotecasService.save(this.biblioteca).subscribe({
      next: mensagem => {

        this.retorno.emit(mensagem);

      },
      error: erro => {
        alert('Deu erro');
      }
    });


  }

  update(){


    this.bibliotecasService.update(this.biblioteca).subscribe({
      next: mensagem =>{
        
        this.retorno.emit(mensagem);

      },
      error: erro =>{
        alert('Deu erro');
      }
    });
  }


}
