import { Component } from '@angular/core';
import { PessoasService } from './pessoas/services/pessoas.service';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-root',
  // template: '<ejs-schedule></ejs-schedule>',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'calendario-angular';

  onResizeEnd(event: ResizeEvent): void {
    console.log('Resize event:', event);
  }

  constructor(
        private pessoaService: PessoasService
  ){}


}
