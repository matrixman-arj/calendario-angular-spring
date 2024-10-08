import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';

import { Calendarios } from '../modelo/Calendarios';


@Injectable({
  providedIn: 'root'
})
export class CalendariosService {
  [x: string]: any;

  private readonly API = '/api/calendarios';

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Calendarios[]> {
    return this.httpClient.get<Calendarios[]>(this.API)
    .pipe(
      first(),
      //delay(5000),
      //tap(assessorias => console.log(assessorias))
    );
  }

  loadById(id: string){
    return this.httpClient.get<Calendarios>(`${this.API}/${id}`);
   }

   save(record: Partial<Calendarios>) {
    console.log(record);
    if (record.id != null) {
     // console.log('update');
      return this.update(record);
    } else {

      return this.create(record);
    }
   // console.log('create');
  }

  private create(record: Partial<Calendarios>){
    return this.httpClient.post<Calendarios>(this.API, record).pipe(first());
  }

  private update(record: Partial<Calendarios>) {
    return this.httpClient.put<Calendarios>(`${this.API}/${record.id}`, record).pipe(first());

  }

  remove(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());

  }

}
