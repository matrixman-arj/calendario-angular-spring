import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Agendamento } from '../modelo/Agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentosService {

  private readonly API = '/api/agendamentos';

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
    //console.log(record);
    if (record._id) {
     // console.log('update');
      return this.update(record);
    }
   // console.log('create');
    return this.create(record);
  }

  private create(record: Partial<Agendamento>){
    return this.httpClient.post<Agendamento>(this.API, record).pipe(first());
  }

  private update(record: Partial<Agendamento>) {
    return this.httpClient.put<Agendamento>(`${this.API}/${record._id}`, record).pipe(first());

  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());

  }

}
