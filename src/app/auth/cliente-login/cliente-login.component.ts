// cliente-login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';


@Component({
  selector: 'app-cliente-login',
  templateUrl: './cliente-login.component.html',
  styleUrls: ['./cliente-login.component.css']
})
export class ClienteLoginComponent {
  usuario: string = '';
  contrasena: string = '';
  loginError: boolean = false;

  constructor(private clienteService: ClienteService, private router: Router) {}

  // cliente-login.component.ts
onSubmit() {
  this.clienteService.authenticate(this.usuario, this.contrasena)
    .subscribe(
      (response: any) => {
        console.log("Login exitoso:", response);
        alert("Login exitoso");

        localStorage.setItem('cliente', JSON.stringify(response)); // Guarda toda la info del cliente
        localStorage.setItem('clienteId', response.id); 

        
        this.router.navigate(['cliente/detallesCliente', response.id]);
      },
      error => {
        console.error('Error de login:', error);
        this.loginError = true; 
        alert("Usuario o contraseña incorrectos");
      }
    );
}

}
