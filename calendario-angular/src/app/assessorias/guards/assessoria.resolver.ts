import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Assessoria } from '../../assessorias/model/assessoria';
import { AssessoriasService } from '../../assessorias/services/assessorias.service';

@Injectable({
  providedIn: 'root'
})

export class AssessoriaResolver  {
  constructor(private readonly service: AssessoriasService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Assessoria> | Promise<Assessoria> | Assessoria {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({_id:'', sigla:'', descricao:'',  assessoriaPai: null,  ordem:0, interna:false} );
  }
}
