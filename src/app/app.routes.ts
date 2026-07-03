import { Routes } from '@angular/router';
import { Login } from './page/auth/login/login';
import { Registro } from './page/auth/registro/registro';
import { DashboardAdmin } from './page/admin/dashboard-admin/dashboard-admin';
import { GestionMedicos } from './page/admin/gestion-medicos/gestion-medicos';
import { DashboardPaciente } from './page/paciente/dashboard-paciente/dashboard-paciente';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: Login },
  { path: 'auth/registro', component: Registro },
  { path: 'admin', component: DashboardAdmin },
  { path: 'admin/medicos', component: GestionMedicos },
  { path: 'paciente', component: DashboardPaciente },
  { path: '**', redirectTo: 'auth/login' }
];
