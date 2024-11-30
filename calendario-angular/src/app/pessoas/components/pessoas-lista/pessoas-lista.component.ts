import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Pessoa } from '../../model/pessoa';
import {  MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

import { PostoGraduacao, PostoGraduacaoList } from '../../../enums/PostoGraduacao/PostoGraduacao';
import { TipoAcesso, TipoAcessoList } from '../../../enums/TipoAcesso';

import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

import { MatCard } from '@angular/material/card';
@Component({
    selector: 'app-pessoas-lista',
    templateUrl: './pessoas-lista.component.html',
    styleUrl: './pessoas-lista.component.scss',
    standalone: true,
    imports: [MatCard, MatTable, MatColumnDef,
              MatHeaderCellDef, MatHeaderCell,
              MatCellDef, MatCell, MatIcon,
              MatIconButton, MatHeaderRowDef,
              MatHeaderRow, MatRowDef, MatRow
              ]
})
export class PessoasListaComponent implements OnInit {



 @Input() pessoas: Pessoa[] = [];
 @Output() add = new EventEmitter(false);
 @Output() edit = new EventEmitter(false);
 @Output() delete = new EventEmitter(false);


 postos = PostoGraduacaoList;
 selectedPosto = PostoGraduacao.GEN_EXERCITO;


 acessos = TipoAcessoList;
 selectedAcesso: TipoAcesso | undefined;




  readonly displayedColumns = ['caminho','identidade', 'nome', 'postoGraduacao', 'nomeGuerra',  'assessoria', 'ramal', 'acoes'];


  constructor( ){  }



  ngOnInit(): void {
    // Initialization logic can be added here if needed
    console.log('PessoasListaComponent initialized');
  }


  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = 'http://localhost:8080/media/branco.jpg';
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

  getPostoImage(postoGraduacao: string): string {
    const posto = PostoGraduacaoList.find(p => p.viewValue === postoGraduacao);
    return posto ? posto.imageUrl : '';
  }

}
