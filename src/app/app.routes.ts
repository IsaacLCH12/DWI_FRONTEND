import { Routes } from '@angular/router';

// Componentes Públicos
import { Login } from './page/auth/login/login';
import { Registro } from './page/auth/registro/registro';

// Layouts Maestros
import { PacienteLayout } from './layout/paciente-layout/paciente-layout';
import { AdminLayout } from './layout/admin-layout/admin-layout';

// Guards (Debes tener estos archivos en core/guards)
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  
  // 1. Zona Pública
  { path: 'auth/login', component: Login },
  { path: 'auth/registro', component: Registro },
  
  // 2. Zona Paciente (Usa Layout y rutas hijas)
  { 
    path: 'paciente', 
    component: PacienteLayout, 
    canActivate: [authGuard, roleGuard], 
    data: { role: 'PACIENTE' },
    children: [
      { path: '', loadChildren: () => import('./page/paciente/paciente.routes').then(m => m.pacienteRoutes) }
    ]
  },

  // 3. Zona Admin (Usa Layout y rutas hijas)
  { 
    path: 'admin', 
    component: AdminLayout, 
    canActivate: [authGuard, roleGuard], 
    data: { role: 'ADMIN' },
    children: [
      { path: '', loadChildren: () => import('./page/admin/admin.routes').then(m => m.adminRoutes) }
    ]
  },
  
  { path: '**', redirectTo: 'auth/login' }
];
