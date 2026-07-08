import { Routes } from '@angular/router';
import { DashboardPaciente } from './dashboard-paciente/dashboard-paciente';
<<<<<<< HEAD
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
=======
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
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b
];
