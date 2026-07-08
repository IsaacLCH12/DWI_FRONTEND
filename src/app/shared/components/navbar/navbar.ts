import { Component, inject } from '@angular/core';
// 💡 Agregamos RouterLinkActive aquí en la importación
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  // 💡 Y también lo agregamos aquí adentro de los imports
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  private authService = inject(AuthService);
  private router = inject(Router);

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
