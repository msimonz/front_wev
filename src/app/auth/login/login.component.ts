import { Component } from '@angular/core';
import { AuthService, UserType } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  userType: UserType = 'CLIENTE';
  loginError: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.loginError = false;
    this.errorMessage = '';

    this.authService.login(this.username, this.password, this.userType).subscribe({
      next: (token) => {
        this.authService.getUserDetails(this.userType).subscribe({
          next: (user) => {
            if (user && user.id) {
              console.log(`Login ${this.userType.toLowerCase()} exitoso, redirigiendo...`);
              
              // Redirigir según el tipo de usuario
              switch(this.userType) {
                case 'CLIENTE':
                  this.router.navigate(['/cliente/detallesCliente', user.id]);
                  break;
                case 'VETERINARIO':
                  this.router.navigate(['/veterinario/detallesVeterinario', user.id]);
                  break;
                case 'ADMIN':
                  this.router.navigate(['/admin/dashboard']);
                  break;
                default:
                  this.loginError = true;
                  this.errorMessage = 'Tipo de usuario no válido';
                  this.authService.logout();
              }
            } else {
              this.loginError = true;
              this.errorMessage = 'No se pudo obtener los detalles del usuario después del login.';
              this.authService.logout();
            }
          },
          error: (error) => {
            this.loginError = true;
            this.errorMessage = 'Error al obtener los detalles del usuario después del login.';
            console.error('Error al obtener detalles:', error);
            this.authService.logout();
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

  getTitle(): string {
    switch(this.userType) {
      case 'ADMIN':
        return 'Iniciar Sesión como Administrador';
      case 'VETERINARIO':
        return 'Iniciar Sesión como Veterinario';
      case 'CLIENTE':
        return 'Iniciar Sesión como Cliente';
      default:
        return 'Iniciar Sesión';
    }
  }
} 