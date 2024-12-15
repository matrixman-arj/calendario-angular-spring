import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Autor } from '../models/autor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  http = inject(HttpClient); //a estrutura pronta pra fazer requisições

  API = "http://localhost:8080/api/autor"; //começo do endpoint pra chegar na controller

  constructor() { }

  findByNome(pesquisa: string): Observable<Autor[]>{
    let abc = new HttpParams().set('nome', pesquisa);
    return this.http.get<Autor[]>(this.API+"/findByNome", {params: abc})
  }

  findAll(): Observable<Autor[]>  {
    return this.http.get<Autor[]>(this.API+"/findAll");
  }

  findById(id: number): Observable<Autor>{
    return this.http.get<Autor>(this.API+"/findById/"+id);
  }

  save(autor: Autor): Observable<string>{
    return this.http.post<string>(this.API+"/save",autor, {responseType: 'text' as 'json'});
  }
  
  update(autor: Autor): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+autor.id, autor, {responseType: 'text' as 'json'});
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

}
