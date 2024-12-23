import { Injectable } from '@angular/core';

import { Usuario } from '../model/usuario';
import { HttpClient } from '@angular/common/http';
import { first, Observable, } from 'rxjs';
import { Assessoria } from '../../assessorias/model/assessoria';
import { UsuarioPage } from '../model/usuario-page';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly API = 'api/usuarios';
  private readonly APIPESQ = 'api/usuarios/search';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  list(termo = '', page = 0, pageSize = 10) {

    return this.httpClient.get<UsuarioPage>(this.APIPESQ, { params: {termo, page, pageSize}})
    .pipe(
      first(),
      //delay(5000),
      //tap(usuarios => console.log(usuarios)),

    );
  }

  reativarUsuario(id: number): Observable<void> {
    return this.httpClient.put<void>(`api/usuarios/reativar/${id}`, null);
  }

  listarInativas(page = 0, pageSize = 10): Observable<UsuarioPage> {
    return this.httpClient.get<UsuarioPage>('api/usuarios/inativas', {
      params: { page, pageSize }
    });
  }


  listPessCompl() {

    return this.httpClient.get<Usuario[]>(this.API)
    .pipe(
      first(),
      //delay(5000),
      //tap(usuarios => console.log(usuarios)),

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
   return this.httpClient.get<Usuario>(`${this.API}/${id}`);
  }


  save(record: Partial<Usuario>) {
    //console.log(record);
    if (record._id) {
     // console.log('update');
      return this.update(record);
    }
   // console.log('create');
    return this.create(record);
  }

  private create(record: Partial<Usuario>){
    return this.httpClient.post<Usuario>(this.API, record).pipe(first());
  }

  private update(record: Partial<Usuario>) {
    return this.httpClient.put<Usuario>(`${this.API}/${record._id}`, record).pipe(first());

  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());

  }

}


