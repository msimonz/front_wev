import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      // Verificar si la ruta requiere un rol específico
      const requiredRole = route.data['role'];
      if (requiredRole && !this.authService.hasRole(requiredRole)) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
      return true;
    }

    // Si no está autenticado, redirigir al login
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
} 