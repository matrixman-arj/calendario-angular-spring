import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/pessoa';
import { PessoasService } from '../services/pessoas.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.scss'
})
export class PessoasComponent implements OnInit {

  pessoas: Observable<Pessoa[]>;
  displayedColumns = ['foto','identidade', 'nome', 'nomeGuerra', 'postoGraduacao', 'assessoria', 'ramal'];

  // pessoasService: PessoasService;

  constructor(private pessoasService: PessoasService){

    this.pessoas = this.pessoasService.list();
  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty


  }

}
