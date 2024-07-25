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
  private readonly APIFOTO = 'api/pessoas/upload'

  constructor(private httpClient: HttpClient) { }

  uploadFile(formData: FormData) {
    return this.httpClient.post(this.APIFOTO, formData);
  }

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

  loadById(id: string){
   return this.httpClient.get<Pessoa>(`${this.API}/${id}`);
  }


  save(record: Partial<Pessoa>, pessoa: FormData) {
    return this.httpClient.post<Pessoa>(this.API, record).pipe(first());
  }

}
function uploadFile(formData: any, FormData: { new(form?: HTMLFormElement, submitter?: HTMLElement | null): FormData; prototype: FormData; }) {
  throw new Error('Function not implemented.');
}

