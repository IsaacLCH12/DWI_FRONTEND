import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

// 💡 Importamos directamente tus archivos de rutas
import { authRoutes } from './page/auth/auth.routes';
import { pacienteRoutes } from './page/paciente/paciente.routes';
import { adminRoutes } from './page/admin/admin.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // Módulo de Autenticación (Importación directa)
  {
    path: 'auth',
    children: authRoutes
  },

  // Módulo de Paciente (Protegido y con importación directa)
  {
    path: 'paciente',
    canActivate: [authGuard, roleGuard],
    data: { role: 'PACIENTE' }, // 💡 El prefijo exacto del backend
    children: pacienteRoutes
  },

  // Módulo de Admin (Protegido y con importación directa)
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' }, // 💡 El prefijo exacto del backend
    children: adminRoutes
  },

  // Ruta comodín si escriben una URL que no existe
  { path: '**', redirectTo: 'auth/login' }
];
