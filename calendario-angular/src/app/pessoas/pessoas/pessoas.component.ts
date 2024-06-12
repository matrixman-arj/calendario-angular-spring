import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/pessoa';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.scss'
})
export class PessoasComponent implements OnInit {

  pessoas: Pessoa[] = [
    { _id: '1', identidade: '0195623038', nome: 'Vanilton Gomes dos Santos', nomeGuerra: 'Vanilton', postoGraduacao: '2º Sgt', assessoria: 'DTI', users:'', tipoAcesso: '', liberado: true, ramal: '810 5051' }
  ];
  displayedColumns = ['identidade', 'nome', 'nomeGuerra', 'postoGraduacao', 'assessoria', 'ramal'];

  constructor(){

  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty


  }

}
