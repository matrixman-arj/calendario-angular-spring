import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.scss'
})
export class PessoasComponent implements OnInit {

  pessoas: any[] = [];

  constructor(){

  }

  ngOnInit(): void {

  }

}
