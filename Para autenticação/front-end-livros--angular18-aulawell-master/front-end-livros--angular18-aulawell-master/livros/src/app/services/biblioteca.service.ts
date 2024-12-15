import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Biblioteca } from '../models/biblioteca';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {

  http = inject(HttpClient); //a estrutura pronta pra fazer requisições

  API = "http://localhost:8080/api/biblioteca"; //começo do endpoint pra chegar na controller

  constructor() { }

  findByNome(pesquisa: string): Observable<Biblioteca[]>{
    let abc = new HttpParams().set('nome', pesquisa);
    return this.http.get<Biblioteca[]>(this.API+"/findByNome", {params: abc})
  }

  findAll(): Observable<Biblioteca[]>  {
    return this.http.get<Biblioteca[]>(this.API+"/findAll");
  }

  findById(id: number): Observable<Biblioteca>{
    return this.http.get<Biblioteca>(this.API+"/findById/"+id);
  }

  save(biblioteca: Biblioteca): Observable<string>{
    return this.http.post<string>(this.API+"/save",biblioteca, {responseType: 'text' as 'json'});
  }
  
  update(biblioteca: Biblioteca): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+biblioteca.id, biblioteca, {responseType: 'text' as 'json'});
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

}
