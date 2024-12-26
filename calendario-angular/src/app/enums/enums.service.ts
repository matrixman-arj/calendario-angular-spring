import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';

import { Acessorios } from './Acessorios/Acessorios';
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

  getAcessoriosEnums() {
    return this.httpClient.get<Acessorios[]>(`${this.httpClient}/enumerado`);

  }

}



