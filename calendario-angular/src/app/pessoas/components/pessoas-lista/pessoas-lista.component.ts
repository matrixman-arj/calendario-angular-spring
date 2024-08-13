import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Pessoa } from '../../model/pessoa';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { PostoGraduacao, PostoGraduacaoList } from '../../../enums/PostoGraduacao/PostoGraduacao';
import { TipoAcesso, TipoAcessoList } from '../../../enums/TipoAcesso';
import { SharedModule } from '../../../shared/shared.module';

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




 postos = PostoGraduacaoList;
 selectedPosto = PostoGraduacao.GEN_EXERCITO;


 acessos = TipoAcessoList;
 selectedAcesso: TipoAcesso | undefined;




  readonly displayedColumns = ['caminho','identidade', 'nome', 'nomeGuerra', 'postoGraduacao', 'assessoria', 'ramal', 'acoes'];

  // pessoasService: PessoasService;

  dataSource = new MatTableDataSource<Pessoa>();

  constructor(
    private http: HttpClient,
    private shared: SharedModule


   ){

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


  getPostoImage(postoGraduacao: PostoGraduacao): string {
    const posto = PostoGraduacaoList.find(p => p.value === postoGraduacao);
    const imageUrl = posto ? posto.imageUrl : '';
    console.log('Posto:', posto);
    console.log('Image URL:', imageUrl);
    return imageUrl;
}




}
