import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Pessoa } from '../../model/pessoa';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-pessoas-lista',
  templateUrl: './pessoas-lista.component.html',
  styleUrl: './pessoas-lista.component.scss'
})
export class PessoasListaComponent implements OnInit {

 @Input() pessoas: Pessoa[] = [];
 @Output() add = new EventEmitter(false);
 @Output() edit = new EventEmitter(false);
 @Output() delete = new EventEmitter(false);


  readonly displayedColumns = ['caminho','identidade', 'nome', 'nomeGuerra', 'postoGraduacao', 'assessoria', 'ramal', 'acoes'];

  // pessoasService: PessoasService;

  dataSource = new MatTableDataSource<Pessoa>();

  constructor(private http: HttpClient ){

   }

  ngOnInit(): void {
    this.http.get<Pessoa[]>('/api/pessoas').subscribe(data => {
      this.dataSource.data = data;
    });

  }

  onAdd(){
    this.add.emit(true);

  }

  onEdit(pessoa: Pessoa ){
    this.edit.emit(pessoa);
  }

  onDelete(pessoa: Pessoa){
    this.delete.emit(pessoa);

  }

  getPersonImage(identidade: string): string {
    return `assets/images/${identidade}.jpg`;
  }

}
