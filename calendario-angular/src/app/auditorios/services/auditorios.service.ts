import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Auditorio } from '../modelo/Auditorio';

import { AuditorioPage } from '../modelo/auditorio-page';

@Injectable({
  providedIn: 'root'
})
export class AuditoriosService {

  private readonly API = '/api/auditorios';
  private readonly APIPESQ = 'api/auditorios/search';

  constructor(private readonly httpClient: HttpClient) { }

  list(): Observable<Auditorio[]> {
    return this.httpClient.get<Auditorio[]>(this.API)
    .pipe(
      first(),
      //delay(5000),
      //tap(assessorias => console.log(assessorias))
    );
  }

  list2(termo = '', page = 0, pageSize = 10): Observable<AuditorioPage> {
    return this.httpClient.get<AuditorioPage>(this.APIPESQ, { params: {termo, page, pageSize}})
    .pipe(
      first(),
      //delay(5000),
      //tap(assessorias => console.log(assessorias))
    );
  }


  loadById(id: string){
    return this.httpClient.get<Auditorio>(`${this.API}/${id}`);
   }

   save(record: Partial<Auditorio>) {
    console.log(record);
    if (record.id != null) {
     // console.log('update');
      return this.update(record);
    } else {

      return this.create(record);
    }
   // console.log('create');
  }

  private create(record: Partial<Auditorio>){
    return this.httpClient.post<Auditorio>(this.API, record).pipe(first());
  }

  private update(record: Partial<Auditorio>) {
    return this.httpClient.put<Auditorio>(`${this.API}/${record.id}`, record).pipe(first());

  }

  remove(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());

  }

}
