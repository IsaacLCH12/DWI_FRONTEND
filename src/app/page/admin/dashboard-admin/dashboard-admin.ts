import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { MedicoService } from '../../../core/services/medico.service';
import { SedeService } from '../../../core/services/sede.service';
import { ServicioService } from '../../../core/services/servicio.service';
import { PacienteService } from '../../../core/services/paciente.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './dashboard-admin.html',
  styleUrls: ['./dashboard-admin.scss']
})
export class DashboardAdmin implements OnInit {
  private medicoService = inject(MedicoService);
  private sedeService = inject(SedeService);
  private servicioService = inject(ServicioService);
  private pacienteService = inject(PacienteService);

  totalMedicos = 0;
  totalSedes = 0;
  totalServicios = 0;
  totalPacientes = 0;

  ngOnInit() {
    this.medicoService.getAllMedicos().subscribe({
      next: (res: any[]) => this.totalMedicos = res.length,
      error: () => this.totalMedicos = 0
    });
    this.sedeService.getSedesActivas().subscribe({
      next: (res: any[]) => this.totalSedes = res.length,
      error: () => this.totalSedes = 0
    });
    this.servicioService.getServiciosActivos().subscribe({
      next: (res: any[]) => this.totalServicios = res.length,
      error: () => this.totalServicios = 0
    });
    this.pacienteService.getAllPacientes().subscribe({
      next: (res: any[]) => this.totalPacientes = res.length,
      error: () => this.totalPacientes = 0
    });
  }
}
