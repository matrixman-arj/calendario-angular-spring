import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Login } from '../../../models/login';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  login: Login = new Login();

  loginService = inject(LoginService);

  router = inject(Router); //equivalente ao @Autowired.... traz uma instância única do roteador para o componente


  constructor(){
    this.loginService.removerToken();
  }

  autenticar() {

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
   


    this.loginService.logar(this.login).subscribe({
      next: token => {
        this.loginService.addToken(token);
        this.router.navigate(['admin/dashboard']);
      },
      error: erro => {
        Toast.fire({
          icon: "error",
          title: "Usuário ou senha incorretos!"
        });
      }
    })

   
    
  }
  
}
