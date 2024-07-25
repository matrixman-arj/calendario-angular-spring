import { Component } from '@angular/core';
import { MediaService } from './media.service';
import { PessoasService } from './pessoas/services/pessoas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'calendario-angular';

  constructor(
    private mediaService: MediaService,
    private pessoaService: PessoasService
  ){}

  upload(event: any) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.pessoaService.uploadFile(formData)
        .subscribe((response: any) => {
          console.log('response', response)
        })
    }
  }
}
