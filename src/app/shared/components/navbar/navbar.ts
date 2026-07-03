import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav style="background: #1D4ED8; color: white; padding: 1rem; display: flex; justify-content: space-between;">
      <span>Clinica Romero</span>
      <div>
        <a routerLink="/paciente" style="color:white; margin-right:15px;">Inicio</a>
        <a routerLink="/paciente/reservar" style="color:white; margin-right:15px;">Reservar</a>
        <button (click)="logout()" style="background:white; border:none; cursor:pointer;">Salir</button>
      </div>
    </nav>`
})
export class Navbar {
  private authService = inject(AuthService);
  private router = inject(Router);
  logout() { this.authService.logout(); this.router.navigate(['/auth/login']); }
}
