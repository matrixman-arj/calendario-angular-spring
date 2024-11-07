import { Component } from '@angular/core';
import { PessoasService } from './pessoas/services/pessoas.service';
import { ResizeEvent } from 'angular-resizable-element';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'app-root',
    // template: '<ejs-schedule></ejs-schedule>',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [MatToolbar, RouterOutlet]
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
