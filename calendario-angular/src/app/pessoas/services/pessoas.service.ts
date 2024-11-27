import { Injectable } from '@angular/core';

import { Pessoa } from '../model/pessoa';
import { HttpClient } from '@angular/common/http';
import { first, } from 'rxjs';
import { Assessoria } from '../../assessorias/model/assessoria';
import { PessoaPage } from '../model/pessoa-page';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  private readonly API = 'api/pessoas';
  private readonly APIPESQ = 'api/pessoas/search';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  list(termo = '', page = 0, pageSize = 10) {

    return this.httpClient.get<PessoaPage>(this.APIPESQ, { params: {termo, page, pageSize}})
    .pipe(
      first(),
      //delay(5000),
      //tap(pessoas => console.log(pessoas)),

    );
  }

  listPessCompl() {

    return this.httpClient.get<Pessoa[]>(this.API)
    .pipe(
      first(),
      //delay(5000),
      //tap(pessoas => console.log(pessoas)),

    );
  }


  assessorias() {
    return this.httpClient.get<Assessoria[]>(this.API)
    .pipe(
      first(),
      //delay(5000),
      //tap(assessorias => console.log(assessorias)),

    );


  }

  // listAssessCompl() {
  //   return this.httpClient.get<Assessoria[]>(this.API)
  //   .pipe(
  //     first(),
  //     //delay(5000),
  //     //tap(assessorias => console.log(assessorias)),

  //   );


  // }

  loadById(id: string){
   return this.httpClient.get<Pessoa>(`${this.API}/${id}`);
  }


  save(record: Partial<Pessoa>) {
    //console.log(record);
    if (record._id) {
     // console.log('update');
      return this.update(record);
    }
   // console.log('create');
    return this.create(record);
  }

  private create(record: Partial<Pessoa>){
    return this.httpClient.post<Pessoa>(this.API, record).pipe(first());
  }

  private update(record: Partial<Pessoa>) {
    return this.httpClient.put<Pessoa>(`${this.API}/${record._id}`, record).pipe(first());

  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());

  }

}


