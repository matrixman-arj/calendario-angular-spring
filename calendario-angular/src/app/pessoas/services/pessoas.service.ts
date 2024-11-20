import { Injectable } from '@angular/core';

import { Pessoa } from '../model/pessoa';
import { HttpClient } from '@angular/common/http';
import { delay, first, } from 'rxjs';
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

  list(page = 0, pageSize = 5) {

    return this.httpClient.get<PessoaPage>(this.API, { params: {page, pageSize}})
    .pipe(
      first(),
      //delay(5000),
      //tap(pessoas => console.log(pessoas)),

    );
  }



  // list(termo: string = '', page: number = 0, size: number = 10): Observable<PessoaPage> {
  //   const pageSize = size;
  //   const params = new HttpParams()
  //       .set('termo', termo)
  //       .set('page', page) // Converte o número para string
  //       .set('size', size); // Converte o número para string

  //     // return this.httpClient.get<PessoaPage>(`${this.API}/search`, { params });
  //     return this.httpClient.get<PessoaPage>(this.APIPESQ, { params });
  //   }

    // list(termo: string = '', page: number = 0, size: number = 10): Observable<PessoaPage> {
    //   const pageSize = size;


    //   return this.httpClient.get<PessoaPage>(this.APIPESQ, { params: {termo, page, pageSize} });
    // }


  assessorias() {
    return this.httpClient.get<Assessoria[]>(this.API)
    .pipe(
      first(),
      //delay(5000),
      //tap(assessorias => console.log(assessorias)),

    );


  }

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


