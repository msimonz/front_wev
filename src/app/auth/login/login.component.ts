import { Component, Input } from '@angular/core';
import { AuthService, UserType } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() userType: UserType = 'CLIENTE';
  @Input() redirectUrl: string = '/';

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

    this.authService.login(this.username, this.password, this.userType).subscribe({
      next: (res) => {
        // Solo tenemos el token, podrías hacer una petición adicional para obtener los datos del usuario
        this.router.navigate([this.redirectUrl]);
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