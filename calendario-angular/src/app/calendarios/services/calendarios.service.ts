import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Agendamento } from '../../agendamentos/modelo/Agendamento';


@Injectable({
  providedIn: 'root'
})
export class CalendariosService {

  private readonly API = '/api/calendarios';

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Agendamento[]> {
    return this.httpClient.get<Agendamento[]>(this.API)
    .pipe(
      first(),
      //delay(5000),
      //tap(assessorias => console.log(assessorias))
    );
  }

  loadById(id: string){
    return this.httpClient.get<Agendamento>(`${this.API}/${id}`);
   }

   save(record: Partial<Agendamento>) {
    console.log(record);
    if (record.id != null) {
     // console.log('update');
      return this.update(record);
    } else {

      return this.create(record);
    }
   // console.log('create');
  }

  private create(record: Partial<Agendamento>){
    return this.httpClient.post<Agendamento>(this.API, record).pipe(first());
  }

  private update(record: Partial<Agendamento>) {
    return this.httpClient.put<Agendamento>(`${this.API}/${record.id}`, record).pipe(first());

  }

  remove(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());

  }

}
