import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../model/usuario';

import { TipoAcesso, TipoAcessoList } from '../../../enums/TipoAcesso';

import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { MatCard } from '@angular/material/card';
@Component({
    selector: 'app-usuarios-lista',
    templateUrl: './usuarios-lista.component.html',
    styleUrl: './usuarios-lista.component.scss',
    standalone: true,
    imports: [MatCard, MatTable, MatColumnDef,
              MatHeaderCellDef, MatHeaderCell,
              MatCellDef, MatCell, MatIcon,
              MatIconButton, MatHeaderRowDef,
              MatHeaderRow, MatRowDef, MatRow
              ]
})
export class UsuariosListaComponent implements OnInit {



 @Input() usuarios$: Usuario[] = [];
 @Input() usuarios: Usuario[] = [];
 @Output() add = new EventEmitter(false);
 @Output() edit = new EventEmitter(false);
 @Output() delete = new EventEmitter(false);
 @Input() dataSource = new MatTableDataSource<Usuario>(); // Use MatTableDataSource


 acessos = TipoAcessoList;
 selectedAcesso: TipoAcesso | undefined;

  readonly displayedColumns = ['username', 'role', 'liberado', 'acoes'];


  constructor( ){  }



  ngOnInit(): void {
    // Initialization logic can be added here if needed
    console.log('UsuariosListaComponent initialized');
  }


  onAdd(){
    this.add.emit(true);

  }

  onEdit(usuario: Usuario ){
    this.edit.emit(usuario);
  }

  onDelete(usuario: Usuario){
    this.delete.emit(usuario);

  }

}
