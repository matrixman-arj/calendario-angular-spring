import { PessoasService } from './../pessoas/services/pessoas.service';
import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';

import { Pessoa } from '../pessoas/model/pessoa';
import { PostoGraduacao } from './PostoGraduacao';
import { TipoAcesso } from './TipoAcesso';

@Injectable({
  providedIn: 'root'
})
export class EnumsService {

  private readonly API = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }


  getEnums() {
    return this.httpClient.get<PostoGraduacao[]>(`${this.httpClient}/enumerado`);

}

getAcessoEnums() {
  return this.httpClient.get<TipoAcesso[]>(`${this.httpClient}/enumerado`);

}

}
