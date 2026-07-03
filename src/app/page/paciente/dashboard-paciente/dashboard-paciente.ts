import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PacienteService } from '../../../core/services/paciente.service';

@Component({
  selector: 'app-dashboard-paciente',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-paciente.html',
  styleUrls: ['./dashboard-paciente.scss']
})
export class DashboardPaciente implements OnInit {
  private pacienteService = inject(PacienteService);
  nombrePaciente: string = '';

  ngOnInit() {
    const id = localStorage.getItem('usuarioId');
    if (id) {
      this.pacienteService.getPaciente(id).subscribe((res: any) => {
        this.nombrePaciente = res.nombre;
      });
    }
  }
}

