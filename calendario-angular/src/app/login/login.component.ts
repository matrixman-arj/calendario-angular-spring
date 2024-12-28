import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
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
export class LoginComponent implements OnInit {

  siglaSistema: string = '';
  descricaoSistema: string = '';
  login = { username: '', password: '' };

  // login: Login = new Login();

  // router = inject(Router);
  hide = true;

  // loginService = inject(LoginService);

  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService

  ) {
    this.loginService.removerToken();
  }


  ngOnInit(): void {
    const systemType = this.route.snapshot.url[0]?.path; // Obtém a parte da URL
    if (systemType === 'sisgepess') {
      this.siglaSistema = 'SISGEPESS';
      this.descricaoSistema = 'Sistema de Gestão de Pessoal';

    } else if (systemType === 'sisagenda') {
      this.siglaSistema = 'SISAGENDA';
      this.descricaoSistema = 'Sistema de Agendamento';

    } else if (systemType === 'administrador') {
      this.siglaSistema = 'ADMINISTRADOR';
      this.descricaoSistema = 'Administrador do Sistema';
    }
    // Define o sistema atual no LoginService
    this.loginService.setCurrentSystem(this.siglaSistema);
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),

  });

  logar(): void {
    this.loginService.logar(this.login).subscribe({
      next: token => {
        if (token) {
          // Adiciona o token ao armazenamento local ou sessão
          this.loginService.addToken(token);

          // Redireciona baseado no sistema selecionado
          if (this.siglaSistema === 'SISGEPESS' || this.siglaSistema === 'ADMINISTRADOR') {
            this.router.navigate(['/pessoas']);
          } else if (this.siglaSistema === 'SISAGENDA') {
            this.router.navigate(['/auditorios/new']);
          }
        } else {
          alert('Usuário ou senha inválidos');
        }
      },
      error: () => {
        alert('Usuário ou senha inválidos');
      }
    });
  }


  // logar(): void {
  //   // Autenticação simulada
  //   if (this.login.username && this.login.password) {
  //     if (this.siglaSistema === 'SISGEPESS' || this.siglaSistema === 'ADMINISTRADOR') {
  //       this.router.navigate(['/pessoas']); // Redireciona para tabela de pessoas
  //     } else if (this.siglaSistema === 'SISAGENDA') {
  //       this.router.navigate(['/auditorios/new']); // Redireciona para auditorio/new
  //     }
  //   } else {
  //     alert('Por favor, preencha todos os campos!');
  //   }
  // }

  // logar() {
  //   this.loginService.logar(this.login).subscribe({
  //     next: token => {
  //       if (token) {
  //         this.loginService.addToken(token);
  //         this.router.navigate(['/pessoas']);
  //       } else {
  //         alert('Usuário ou senha inválidos');
  //       }
  //     },
  //     error: () => {
  //       alert('Usuário ou senha inválidos');
  //     }
  //   });
  // }


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
