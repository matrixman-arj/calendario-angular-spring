import { Component } from '@angular/core';
import { PessoasService } from './pessoas/services/pessoas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'calendario-angular';

  constructor(
        private pessoaService: PessoasService
  ){}


}
