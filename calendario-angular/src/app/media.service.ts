<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private readonly APIFOTO = 'http://localhost:8080/media/upload'

  constructor(
    private http: HttpClient
  ) { }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(this.APIFOTO, formData);
  }

  }





=======
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private readonly APIFOTO = 'http://localhost:8080/media/upload'

  constructor(
    private http: HttpClient
  ) { }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(this.APIFOTO, formData);
  }

  }





>>>>>>> 43d93e8084e9d3d4c74280469e93fe6b369d86f7
