import { Routes } from '@angular/router';
import { DashboardAdmin } from './dashboard-admin/dashboard-admin';
import { GestionMedicos } from './gestion-medicos/gestion-medicos';
import { GestionSedes } from './gestion-sedes/gestion-sedes';
import { GestionServicios } from './gestion-servicios/gestion-servicios';
import { GestionHorarios } from './gestion-horarios/gestion-horarios';
import { GestionCitas } from './gestion-citas/gestion-citas';
import { GestionPagos } from './gestion-pagos/gestion-pagos';
import { GestionPacientes } from './gestion-pacientes/gestion-pacientes';

export const adminRoutes: Routes = [
  { path: '', component: DashboardAdmin },
  { path: 'medicos', component: GestionMedicos },
  { path: 'sedes', component: GestionSedes },
    { path: 'servicios', component: GestionServicios},

  {
    path: 'pacientes',component: GestionPacientes},
  { path: 'horarios', component: GestionHorarios },
  { path: 'citas', component: GestionCitas },
    { path: 'pagos', component: GestionPagos},


];
