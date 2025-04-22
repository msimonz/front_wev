import { Component } from '@angular/core';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-veterinario-login',
  templateUrl: './veterinario-login.component.html',
  styleUrls: ['./veterinario-login.component.css']
})
export class VeterinarioLoginComponent {
  usuario: string = '';
  contrasena: string = '';
  loginError: boolean = false;

  constructor(private veterinarioService: VeterinarioService, private router: Router) {}

  onSubmit() {
    this.veterinarioService.authenticate(this.usuario, this.contrasena)
      .subscribe(
        (response: any) => {
          console.log("Login exitoso:", response);
          alert("Login exitoso");
  
          localStorage.setItem('veterinario', JSON.stringify(response));
          localStorage.setItem('veterinarioId', response.id);

          this.router.navigate(['veterinario/detallesVeterinario', response.id]);
        },
        error => {
          console.error('Error de login:', error);
          console.error('Detalles del error:', error.error); // Agrega esta línea para ver más detalles
          this.loginError = true;
          alert("Usuario o contraseña incorrectos");
        }
      );
  }
}
