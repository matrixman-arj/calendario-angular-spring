import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { PessoasService } from '../services/pessoas.service';
import { Pessoa } from '../model/pessoa';
import { Observable, of } from 'rxjs';
import { Assessoria } from '../../assessorias/model/assessoria';

@Injectable({
  providedIn: 'root'
})

export class PessoaResolver implements Resolve<Pessoa> {
  constructor(private service: PessoasService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pessoa> | Promise<Pessoa> | Pessoa {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({_id:'' , identidade:'', users:'', tipoAcesso:'', nome:'', nomeGuerra:'', postoGraduacao:'', assessoria:{_id:'', sigla:'', descricao:'', assessoria_pai_id:'', ordem:0, interna:false} , liberado:'', ramal:'', caminho:'', antiguidade:''});
  }
}
