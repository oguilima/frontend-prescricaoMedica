// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // Se o usuário já estiver autenticado (JWT presente), redirecione para outra rota, por exemplo, 'dashboard'
      this.router.navigate(['/medicos']);
      return false;
    }
    // Permitir acesso à rota de login
    return true;
  }
}


@Injectable({
  providedIn: 'root',
})
export class AuthGuardLogged implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
      
    }
   
    return true;
  }
}
