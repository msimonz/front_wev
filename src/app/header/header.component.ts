import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  currentUser: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      console.log('Current user in header:', user);
      this.isLoggedIn = !!user;
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  navigateToUserDetails(): void {
    if (!this.currentUser) {
      console.log('No hay usuario actual');
      return;
    }
    console.log('Navegando con usuario:', this.currentUser.nombre);
    // Determinar la ruta basada en el tipo de usuario
    if (this.currentUser.tipo === 'ADMIN') {
      this.router.navigate(['/admin/dashboard']);
      console.log('Navegando con usuario:', this.currentUser);
    } 
    else if (!(this.currentUser.tipo === 'ADMIN') && !this.currentUser.nombre.includes('Dr.')) {
        this.router.navigate(['/cliente/detallesCliente', this.currentUser.id]);
        console.log('Navegando con usuario:', this.currentUser);
    } 
    else if (this.currentUser.nombre.includes('Dr.')) {
        this.router.navigate(['/veterinario/detallesVeterinario', this.currentUser.id]);
        console.log('Navegando con usuario:', this.currentUser);
    }
    else {
      console.error('Usuario sin ID o tipo no válido:', this.currentUser);
    }
  }
}
