import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';
import { Assessoria } from '../model/assessoria';


@Injectable({
  providedIn: 'root'
})
export class AssessoriasService {

  private readonly API = 'api/assessorias';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Assessoria[]>(this.API)
    .pipe(
      first(),
      //delay(5000),
      tap(assessorias => console.log(assessorias))
    );
  }

  loadById(id: string){
    return this.httpClient.get<Assessoria>(`${this.API}/${id}`);
   }


  save(record: Partial<Assessoria>) {
    return this.httpClient.post<Assessoria>(this.API, record).pipe(first());
  }

}
