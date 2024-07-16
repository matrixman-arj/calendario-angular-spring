import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Pessoa } from '../../model/pessoa';



@Component({
  selector: 'app-pessoas-lista',
  templateUrl: './pessoas-lista.component.html',
  styleUrl: './pessoas-lista.component.scss'
})
export class PessoasListaComponent implements OnInit {

 @Input() pessoas: Pessoa[] = [];
 @Output() add = new EventEmitter(false);
 @Output() edit = new EventEmitter(false);


  readonly displayedColumns = ['foto','identidade', 'nome', 'nomeGuerra', 'postoGraduacao', 'assessoria', 'ramal', 'acoes'];

  // pessoasService: PessoasService;

  constructor( ){

   }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty

  }

  onAdd(){
    this.add.emit(true);

  }

  onEdit(pessoa: Pessoa ){
    this.edit.emit(pessoa);
  }

}
