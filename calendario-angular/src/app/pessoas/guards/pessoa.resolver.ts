import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { PessoasService } from '../services/pessoas.service';
import { Pessoa } from '../model/pessoa';
import { Observable, of } from 'rxjs';

Injectable({
  providedIn: 'root'
})

export class PessoaResolver implements Resolve<Pessoa> {
  constructor(private service: PessoasService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pessoa> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({_id:'' , identidade:'', users:'', tipoAcesso:'', nome:'', nomeGuerra:'', postoGraduacao:'', assessoria:1 , liberado:'', ramal:'', foto:''});
  }
}
