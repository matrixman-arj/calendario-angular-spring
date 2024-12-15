import { Component, OnInit } from '@angular/core';
import { PessoasService } from './pessoas/services/pessoas.service';
import { ResizeEvent } from 'angular-resizable-element';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { MatButton, MatButtonModule } from '@angular/material/button';
import { CustomSidenavComponent } from "./components/custom-sidenav/custom-sidenav.component";
import { LoginService } from './login/auth/login.service';
import { Login } from './login/auth/login';

@Component({
    selector: 'app-root',
    // template: '<ejs-schedule></ejs-schedule>',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [MatToolbar, MatToolbarModule, RouterOutlet, MatSidenavModule, MatListModule, MatButton, MatButtonModule, MatIconModule,  CustomSidenavComponent]
})
export class AppComponent implements OnInit {
  title = 'calendario-angular';
  opened = false;

  logNavigation(route: string): void {
    console.log('Navigating to:', route);
  }

  onResizeEnd(event: ResizeEvent): void {
    console.log('Resize event:', event);
  }

  constructor(
        private pessoaService: PessoasService,
        private router: Router,
        private loginService : LoginService,
  ){}

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
  ngOnInit(): void {
    console.log('Available Routes:', this.router.config);
  }


  // Método de logout
  logout(): void {
    const login: Login = { username: '', password: '' };
    this.loginService.logar(login).subscribe(() => {
      // Handle successful logout
    });
  }


}
