import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Usuario } from '../model/usuario';
import { UsuariosService } from '../services/usuarios.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioResolver  {

  constructor(private readonly service: UsuariosService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Usuario> | Promise<Usuario> | Usuario {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({_id:'' , identidade:'', users:'', tipoAcesso:'', nome:'', nomeGuerra:'', postoGraduacao:'', assessoria:{_id:'', sigla:'', descricao:'', assessoriaPai:null, ordem:0, interna:false} , liberado:'', ramal:'', caminho:'', antiguidade:0});
  }



}
