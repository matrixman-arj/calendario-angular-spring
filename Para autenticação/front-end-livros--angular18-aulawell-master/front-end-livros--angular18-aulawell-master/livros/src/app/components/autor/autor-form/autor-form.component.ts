import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Autor } from '../../../models/autor';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AutorService } from '../../../services/autor.service';

@Component({
  selector: 'app-autores-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './autor-form.component.html',
  styleUrl: './autor-form.component.scss'
})
export class AutorFormComponent {

  tituloComponente: string = "Novo autor";

  @Input() autor: Autor = new Autor();
  @Output() retorno = new EventEmitter();
  //modoNovo: boolean = true;

  router = inject(Router);
  rotaAtivada = inject(ActivatedRoute);

  autoresService = inject(AutorService);

  constructor(){
    let id = this.rotaAtivada.snapshot.params['id'];
    if(id > 0){
      //this.modoNovo = false; //
      this.tituloComponente = "Editar autor";   
      this.findById(id);
    }
  }


  findById(id: number){
    
    this.autoresService.findById(id).subscribe({
      next: liv => {
        this.autor = liv;
      },
      error: erro => {
        alert('Deu erro');
      }
    })

  }



  save(){

    this.autoresService.save(this.autor).subscribe({
      next: mensagem => {

        this.retorno.emit(mensagem);

      },
      error: erro => {
        alert('Deu erro');
      }
    });


  }

  update(){


    this.autoresService.update(this.autor).subscribe({
      next: mensagem =>{
        
        this.retorno.emit(mensagem);

      },
      error: erro =>{
        alert('Deu erro');
      }
    });
  }


}
