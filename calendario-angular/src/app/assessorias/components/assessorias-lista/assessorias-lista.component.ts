import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Assessoria } from '../../model/assessoria';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton, MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';

@Component({
    selector: 'app-assessorias-lista',
    templateUrl: './assessorias-lista.component.html',
    styleUrl: './assessorias-lista.component.scss',
    standalone: true,
    imports: [MatCard, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatMiniFabButton, MatIcon, MatIconButton, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow]
})
export class AssessoriaListaComponent implements OnInit {

@Input() assessorias: Assessoria[] = [];
@Output() add = new EventEmitter(false);
@Output() edit = new EventEmitter(false);
@Output() delete = new EventEmitter(false);


  readonly displayedColumns = ['descricao','sigla', 'assessoriaPai', 'acoes'];

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

  onDelete(assessoria: Assessoria) {
    this.delete.emit(assessoria);
  }

}
