// cliente-login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-login',
  templateUrl: './cliente-login.component.html',
  styleUrls: ['./cliente-login.component.css']
})
export class ClienteLoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.loginError = false;
    this.errorMessage = '';

    this.authService.login(this.username, this.password, 'CLIENTE').subscribe({
      next: () => {
        this.authService.getUserDetails('CLIENTE').subscribe({
          next: (user) => {
            if (user && user.id) {
              this.router.navigate(['/cliente/detallesCliente', user.id]);
            } else {
              this.loginError = true;
              this.errorMessage = 'No se pudo obtener el ID del cliente.';
            }
          },
          error: (error) => {
            this.loginError = true;
            this.errorMessage = 'Error al obtener los detalles del cliente.';
            console.error('Error al obtener detalles:', error);
          }
        });
      },
      error: (error) => {
        this.loginError = true;
        this.errorMessage = 'Credenciales incorrectas';
        console.error('Error de login:', error);
      }
    });
  }
}
