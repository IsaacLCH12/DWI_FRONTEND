import { Routes } from '@angular/router';
import { DashboardAdmin } from './dashboard-admin/dashboard-admin';
import { GestionMedicos } from './gestion-medicos/gestion-medicos';
import { GestionSedes } from './gestion-sedes/gestion-sedes';
import { GestionServicios } from './gestion-servicios/gestion-servicios';

export const adminRoutes: Routes = [
  { path: '', component: DashboardAdmin },
  { path: 'medicos', component: GestionMedicos },
  { path: 'sedes', component: GestionSedes },
  { path: 'servicios', component: GestionServicios }
];
