import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PacienteService } from '../../../../core/services/paciente.service';

@Component({
  selector: 'app-dashboard-paciente',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard-paciente.html',
  styleUrls: ['./dashboard-paciente.scss']
})
export class DashboardPaciente implements OnInit {
  private pacienteService = inject(PacienteService);
  nombrePaciente = 'Cargando...'; // Texto por defecto mientras consulta a la BD

  ngOnInit() {
    const id = localStorage.getItem('usuarioId');
    if (id) {
      this.pacienteService.getPaciente(id).subscribe(res => {
        this.nombrePaciente = res.nombre; // Aquí atrapamos el nombre real
      });
    }
  }
}
