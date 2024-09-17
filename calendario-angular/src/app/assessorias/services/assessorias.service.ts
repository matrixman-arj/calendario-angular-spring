import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { delay, first, Observable, tap } from 'rxjs';
import { Assessoria } from '../model/assessoria';


@Injectable({
  providedIn: 'root'
})
export class AssessoriasService {

  private readonly API = 'api/assessorias';

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Assessoria[]> {
    return this.httpClient.get<Assessoria[]>(this.API)
    .pipe(
      first(),
      //delay(5000),
      //tap(assessorias => console.log(assessorias))
    );
  }

  listFilha(id: string): Observable<Assessoria[]> {
    return this.httpClient.get<Assessoria[]>(`${this.API}/${id}`);
  }

  // listFilha(): Observable<Assessoria[]> {
  //   return this.httpClient.get<Assessoria[]>(this.APIFILHA)
  //   .pipe(
  //     first(),
  //     //delay(5000),
  //     //tap(assessorias => console.log(assessorias))
  //   );
  // }

  loadById(id: string){
    return this.httpClient.get<Assessoria>(`${this.API}/${id}`);
   }

   save(record: Partial<Assessoria>) {
    //console.log(record);
    if (record._id) {
     // console.log('update');
      return this.update(record);
    }
   // console.log('create');
    return this.create(record);
  }

  private create(record: Partial<Assessoria>){
    return this.httpClient.post<Assessoria>(this.API, record).pipe(first());
  }

  private update(record: Partial<Assessoria>) {
    return this.httpClient.put<Assessoria>(`${this.API}/${record._id}`, record).pipe(first());

  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());

  }


}
