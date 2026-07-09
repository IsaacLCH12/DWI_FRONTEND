import { ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { MedicoService } from '../../../core/services/medico.service';
import { SedeService } from '../../../core/services/sede.service';
import { ServicioService } from '../../../core/services/servicio.service';
import { PacienteService } from '../../../core/services/paciente.service';
import { Subscription, interval } from 'rxjs'; // 💡 Importamos las herramientas para el reloj

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './dashboard-admin.html',
  styleUrls: ['./dashboard-admin.scss']
})
export class DashboardAdmin implements OnInit, OnDestroy {
  private medicoService = inject(MedicoService);
  private sedeService = inject(SedeService);
  private servicioService = inject(ServicioService);
  private pacienteService = inject(PacienteService);
  private cdr = inject(ChangeDetectorRef);

  totalMedicos = 0;
  totalSedes = 0;
  totalServicios = 0;
  totalPacientes = 0;

  // 💡 Variable para controlar nuestro "reloj" de recarga
  private autoRefreshSub!: Subscription;

  ngOnInit() {
    // 1. Cargamos los datos apenas entra a la pantalla
    this.cargarEstadisticas();

    // 💡 2. Configuramos el Auto-Refresh cada 10 segundos (10000 milisegundos)
    this.autoRefreshSub = interval(10000).subscribe(() => {
      this.cargarEstadisticas();
    });
  }

  // 💡 3. Apagamos el reloj si se va a otra pantalla para no consumir memoria
  ngOnDestroy() {
    if (this.autoRefreshSub) {
      this.autoRefreshSub.unsubscribe();
    }
  }

  cargarEstadisticas() {
    this.medicoService.getAllMedicos().subscribe({
      next: (res: any[]) => { this.totalMedicos = res.length; this.cdr.detectChanges(); },
      error: (err) => { console.error('Error médicos:', err); this.totalMedicos = 0; }
    });

    this.sedeService.getSedesActivas().subscribe({
      next: (res: any[]) => { this.totalSedes = res.length; this.cdr.detectChanges(); },
      error: (err) => { console.error('Error sedes:', err); this.totalSedes = 0; }
    });

    this.servicioService.getServiciosActivos().subscribe({
      next: (res: any[]) => { this.totalServicios = res.length; this.cdr.detectChanges(); },
      error: (err) => { console.error('Error servicios:', err); this.totalServicios = 0; }
    });

    this.pacienteService.getAllPacientes().subscribe({
      next: (res: any[]) => { this.totalPacientes = res.length; this.cdr.detectChanges(); },
      error: (err) => { console.error('Error pacientes:', err); this.totalPacientes = 0; }
    });
  }
}
