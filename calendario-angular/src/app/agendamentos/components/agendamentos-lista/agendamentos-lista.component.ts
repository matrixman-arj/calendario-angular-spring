import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Agendamento } from '../../modelo/Agendamento';

import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-agendamentos-lista',
  templateUrl: './agendamentos-lista.component.html',
  styleUrl: './agendamentos-lista.component.scss'
})
export class AgendamentosListaComponent implements OnInit {

  @Input() agendamentos: Agendamento[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter<Agendamento>(); // Mudança aqui para passar o agendamento
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ['data','horaInicio', 'horaFim', 'pessoa', 'assessoria', 'acoes'];


  dataSource = new MatTableDataSource<Agendamento>();

  constructor(
    private http: HttpClient,
  ) { }


  ngOnInit(): void {

    this.dataSource.data = this.agendamentos;

    this.http.get<Agendamento[]>('/api/agendamentos').subscribe(data => {
      this.dataSource.data = data;
    });


  }

  onAdd(){
    this.add.emit(true);
  }

  onEdit(agendamento: Agendamento ){
    this.edit.emit(agendamento);// Emite o agendamento para o componente pai
  }

  onDelete(agendamento: Agendamento) {
    this.delete.emit(agendamento);
  }

}
