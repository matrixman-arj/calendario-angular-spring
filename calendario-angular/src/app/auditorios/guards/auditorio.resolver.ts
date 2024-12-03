import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Auditorio } from '../modelo/Auditorio';
import { AuditoriosService } from '../services/auditorios.service';

@Injectable({
  providedIn: 'root'
})

export class AuditorioResolver {
  constructor(private readonly service: AuditoriosService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Auditorio> | Promise<Auditorio> | Auditorio {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({id:0, dataInicio:'', dataFim:'', horaInicio:'',  horaFim: '',  pessoa:{_id:'', users:'', identidade:'', tipoAcesso:'', nome:'', nomeGuerra:'', postoGraduacao:'', acesso:'', ramal:'', caminho:'', antiguidade:0, assessoria:{_id:'', sigla:'', descricao:'', assessoriaPai:null, ordem:0, interna:false}}, assessoria:{_id:'', sigla:'', descricao:'', assessoriaPai:null, ordem:0, interna:false}, acessorios:[], audiencia:'', evento:'', diex:'', militarLigacao:'' });
  }
}


