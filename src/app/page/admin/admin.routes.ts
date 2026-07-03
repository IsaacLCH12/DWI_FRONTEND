import { Routes } from '@angular/router';
import { DashboardAdmin } from './dashboard-admin/dashboard-admin';
import { GestionMedicos } from './gestion-medicos/gestion-medicos';
import { GestionPacientes } from './gestion-pacientes/gestion-pacientes';

export const adminRoutes: Routes = [
  { path: '', component: DashboardAdmin },
  { path: 'medicos', component: GestionMedicos },
  { path: 'pacientes', component: GestionPacientes }
];
