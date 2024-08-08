import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Assessoria } from '../../model/assessoria';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-assessorias-lista',
  templateUrl: './assessorias-lista.component.html',
  styleUrl: './assessorias-lista.component.scss'
})
export class AssessoriaListaComponent implements OnInit {

@Input() assessorias: Assessoria[] = [];
@Output() add = new EventEmitter(false);
@Output() edit = new EventEmitter(false);


  readonly displayedColumns = ['descricao','sigla', 'acoes'];

  // pessoasService: PessoasService;

  dataSource = new MatTableDataSource<Assessoria>();

  constructor( private http: HttpClient){

  }

  ngOnInit(): void {
    this.http.get<Assessoria[]>('/api/assessorias').subscribe(data => {
      this.dataSource.data = data;
    });
  }

  onAdd(){
    this.add.emit(true);
  }

  onEdit(assessoria: Assessoria ){
    this.edit.emit(assessoria);
  }

}
