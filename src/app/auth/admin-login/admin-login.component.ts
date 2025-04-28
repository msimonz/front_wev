import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  usuario: string = '';
  contrasena: string = '';
  loginError: boolean = false;

  constructor(private adminService: AdminService, private router: Router) {}

  onSubmit() {
    const loginData = {
      usuario: this.usuario,
      contrasena: this.contrasena
    };

    this.adminService.login(loginData).subscribe(
      (response) => {
        // Si el login es exitoso, redirige a otra página (por ejemplo, el dashboard de admin)
        this.router.navigate(['admin/dashboard']);
      },
      (error) => {
        // Si el login falla, muestra el mensaje de error
        this.loginError = true;
        console.log("Error de login:", error);
      }
    );
  }
}
