import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-veterinario-login',
  templateUrl: './veterinario-login.component.html',
  styleUrls: ['./veterinario-login.component.css']
})
export class VeterinarioLoginComponent {
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

    this.authService.login(this.username, this.password, 'VETERINARIO').subscribe({
      next: () => {
        this.authService.getUserDetails('VETERINARIO').subscribe({
          next: (user) => {
            if (user && user.id) {
              this.router.navigate(['/veterinario/detallesVeterinario', user.id]);
            } else {
              this.loginError = true;
              this.errorMessage = 'No se pudo obtener el ID del veterinario.';
            }
          },
          error: (error) => {
            this.loginError = true;
            this.errorMessage = 'Error al obtener los detalles del veterinario.';
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
