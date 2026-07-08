import { Component, inject } from '@angular/core';
// 💡 Agregamos RouterLinkActive aquí también
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  // 💡 Y lo inyectamos aquí
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar {
  private authService = inject(AuthService);
  private router = inject(Router);

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
