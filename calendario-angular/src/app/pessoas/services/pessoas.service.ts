import { Injectable } from '@angular/core';

import { Pessoa } from '../model/pessoa';
import { HttpClient } from '@angular/common/http';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  private readonly API = '/assets/pessoas.json'

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Pessoa[]>(this.API)
    .pipe(
      first(),
      tap(pessoas => console.log(pessoas))
    );
  }

}
