import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PacienteService } from '../../../../core/services/paciente.service';
import { MedicoService } from '../../../../core/services/medico.service';
import { SedeService } from '../../../../core/services/sede.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-admin.html',
  styleUrls: ['./dashboard-admin.scss']
})
export class DashboardAdmin implements OnInit {
  private pacienteService = inject(PacienteService);
  private medicoService = inject(MedicoService);
  private sedeService = inject(SedeService);

  totalPacientes = 0;
  totalMedicos = 0;
  totalSedes = 0;

  ngOnInit() {
    // Consumimos las apis para sacar las métricas en tiempo real
    this.pacienteService.getAllPacientes().subscribe(res => this.totalPacientes = res.length);
    this.medicoService.getAllMedicos().subscribe(res => this.totalMedicos = res.length);
    this.sedeService.getSedesActivas().subscribe(res => this.totalSedes = res.length);
  }
}
