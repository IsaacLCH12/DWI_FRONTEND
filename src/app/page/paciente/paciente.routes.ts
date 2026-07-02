import { Routes } from '@angular/router';
import { DashboardPaciente } from './dashboard-paciente/dashboard-paciente';
import { ReservarCita } from './reservar-cita/reservar-cita';
import { MisCitas } from './mis-citas/mis-citas';
import { HistorialCitas } from './historial-citas/historial-citas';
import { MisPagos } from './mis-pagos/mis-pagos';
import { MiPerfil } from './mi-perfil/mi-perfil';

export const pacienteRoutes: Routes = [
  { path: '', component: DashboardPaciente },
  { path: 'reservar', component: ReservarCita },
  { path: 'mis-citas', component: MisCitas },
  { path: 'historial', component: HistorialCitas },
  { path: 'pagos', component: MisPagos },
  { path: 'perfil', component: MiPerfil }
];
