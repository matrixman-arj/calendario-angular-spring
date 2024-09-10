import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Agendamento } from '../modelo/Agendamento';
import { AgendamentosService } from '../services/agendamentos.service';

@Injectable({
  providedIn: 'root'
})

export class AgendamentoResolver implements Resolve<Agendamento> {
  constructor(private service: AgendamentosService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Agendamento> | Promise<Agendamento> | Agendamento {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({_id:'', data:'', horaInicio:'',  horaFim: '',  pessoa:0, assessoria:0, acessorios:'', audiencia:'', evento:'', diex:'', militarLigacao:'' } );
  }
}


