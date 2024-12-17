import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Login } from './auth/login';
import { LoginService } from './auth/login.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, FormsModule, ReactiveFormsModule, CommonModule, MatIconModule, MatCardModule]
})
export class LoginComponent {

  login: Login = new Login();

  router = inject(Router);
  hide = true;

  loginService = inject(LoginService);

  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();

  constructor() {
    this.loginService.removerToken();
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),

  });

  logar() {
    this.loginService.logar(this.login).subscribe({
      next: token => {
        if (token) {
          this.loginService.addToken(token);
          this.router.navigate(['/pessoas']);
        } else {
          alert('Usuário ou senha inválidos');
        }
      },
      error: () => {
        alert('Usuário ou senha inválidos');
      }
    });
  }


  // logar() {
  //   this.loginService.logar(this.login).subscribe({
  //     next: token => {
  //       if (token) {// Se tem token, o usuário e senha estão corretos.
  //         this.loginService.addToken(token);
  //         this.router.navigate(['/pessoas']);
  //       }else{// Se não tem token, o usuário e senha estão incorretos.
  //         alert('Usuário ou senha inválidos');
  //       }
  //     },
  //     error: erro => {
  //       alert('Usuário ou senha inválidos');
  //     }
  //   });
  // }

  // Método de logout
  logout(): void {
    this.loginService.removerToken(); // Remove o token
  }

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }


}
