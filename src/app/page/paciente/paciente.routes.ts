import { Routes } from '@angular/router';
import { DashboardPaciente } from './dashboard-paciente/dashboard-paciente';
import { HistorialCitas } from './historial-citas/historial-citas';
import { MiPerfil } from './mi-perfil/mi-perfil';
import { MisCitas } from './mis-citas/mis-citas';
import { MisPagos } from './mis-pagos/mis-pagos';
import { ReservarCita } from './reservar-cita/reservar-cita';

export const pacienteRoutes: Routes = [
  { path: '', component: DashboardPaciente },
  { path: 'historial', component: HistorialCitas },
  { path: 'mi-perfil', component: MiPerfil },
  { path: 'mis-citas', component: MisCitas },
  { path: 'mis-pagos', component: MisPagos },
  { path: 'reservar', component: ReservarCita }
];
