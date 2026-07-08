import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // Módulo de Autenticación
  {
    path: 'auth',
    loadChildren: () => import('./page/auth/auth.routes').then(m => m.authRoutes)
  },

  // Módulo de Paciente (Protegido)
  {
    path: 'paciente',
    canActivate: [authGuard, roleGuard],
    data: { role: 'PACIENTE' },
    loadChildren: () => import('./page/paciente/paciente.routes').then(m => m.pacienteRoutes)
  },

  // Módulo de Admin (Protegido)
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' },
    loadChildren: () => import('./page/admin/admin.routes').then(m => m.adminRoutes)
  },

  { path: '**', redirectTo: 'auth/login' }
];
