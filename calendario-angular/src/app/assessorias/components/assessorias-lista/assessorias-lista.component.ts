import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Assessoria } from '../../model/assessoria';

@Component({
  selector: 'app-assessorias-lista',
  templateUrl: './assessorias-lista.component.html',
  styleUrl: './assessorias-lista.component.scss'
})
export class AssessoriaListaComponent implements OnInit {

@Input() assessorias: Assessoria[] = [];
@Output() add = new EventEmitter(false);


  readonly displayedColumns = ['descricao','sigla', 'acoes'];

  // pessoasService: PessoasService;

  constructor(


  ){ }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  onAdd(){
    this.add.emit(true);
  }

}
