import { Injectable } from '@angular/core';

import { Pessoa } from '../model/pessoa';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';
import { Assessoria } from '../../assessorias/model/assessoria';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  private readonly API = 'api/pessoas';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Pessoa[]>(this.API)
    .pipe(
      first(),
      //delay(5000),
      tap(pessoas => console.log(pessoas)),

    );


  }

  assessorias() {
    return this.httpClient.get<Assessoria[]>(this.API)
    .pipe(
      first(),
      //delay(5000),
      tap(assessorias => console.log(assessorias)),

    );


  }

  save(record: Partial<Pessoa>) {
    return this.httpClient.post<Pessoa>(this.API, record).pipe(first());
  }

}
