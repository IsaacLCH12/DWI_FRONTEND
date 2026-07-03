import { Routes } from '@angular/router';
import { Login } from './page/auth/login/login';
import { Registro } from './page/auth/registro/registro';
import { DashboardAdmin } from './page/admin/dashboard-admin/dashboard-admin';
import { GestionMedicos } from './page/admin/gestion-medicos/gestion-medicos';
import { GestionSedes } from './page/admin/gestion-sedes/gestion-sedes';
import { GestionServicios } from './page/admin/gestion-servicios/gestion-servicios';
import { DashboardPaciente } from './page/paciente/dashboard-paciente/dashboard-paciente';
import { MisCitas } from './page/paciente/mis-citas/mis-citas';
import { ReservarCita } from './page/paciente/reservar-cita/reservar-cita';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: Login },
  { path: 'auth/registro', component: Registro },
  { path: 'admin', component: DashboardAdmin },
  { path: 'admin/medicos', component: GestionMedicos },
  { path: 'admin/sedes', component: GestionSedes },
  { path: 'admin/servicios', component: GestionServicios },
  { path: 'paciente', component: DashboardPaciente },
  { path: 'paciente/mis-citas', component: MisCitas },
  { path: 'paciente/reservar', component: ReservarCita },
  { path: '**', redirectTo: 'auth/login' }
];
