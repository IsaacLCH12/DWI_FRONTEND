import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// Importamos tus nuevos servicios específicos
import { SedeService } from '../../../../core/services/sede.service';
import { ServicioService } from '../../../../core/services/servicio.service';
import { MedicoService } from '../../../../core/services/medico.service';
import { HorarioService } from '../../../../core/services/horario.service';
import { CitaService } from '../../../../core/services/cita.service';

@Component({
  selector: 'app-reservar-cita',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservar-cita.html',
  styleUrls: ['./reservar-cita.scss']
})
export class ReservarCita implements OnInit {
  // Inyectamos todos los servicios
  private sedeService = inject(SedeService);
  private servicioService = inject(ServicioService);
  private medicoService = inject(MedicoService);
  private horarioService = inject(HorarioService);
  private citaService = inject(CitaService);
  private router = inject(Router);

  pasoActual = 1;
  sedes: any[] = [];
  servicios: any[] = [];
  medicos: any[] = [];
  horarios: any[] = [];

  reserva = {
    sedeId: null,
    servicioId: null,
    medicoId: null,
    horarioId: null,
    pacienteId: localStorage.getItem('usuarioId')
  };

  ngOnInit() {
    this.cargarSedesYServicios();
  }

  cargarSedesYServicios() {
    this.sedeService.getSedesActivas().subscribe(res => this.sedes = res);
    this.servicioService.getServiciosActivos().subscribe(res => this.servicios = res);
  }

  siguientePaso() {
    if (this.pasoActual === 1 && this.reserva.sedeId && this.reserva.servicioId) {
      this.cargarMedicos();
      this.pasoActual++;
    } else if (this.pasoActual === 2 && this.reserva.medicoId) {
      this.cargarHorarios();
      this.pasoActual++;
    }
  }

  cargarMedicos() {
    // Usamos el id de la sede y el id del servicio
    this.medicoService.getMedicosPorFiltro(this.reserva.sedeId!, this.reserva.servicioId!)
      .subscribe(res => this.medicos = res);
  }

  cargarHorarios() {
    this.horarioService.getHorariosMedico(this.reserva.medicoId!)
      .subscribe(res => this.horarios = res);
  }

  confirmarReserva() {
    this.citaService.crearCita(this.reserva).subscribe({
      next: () => {
        alert('¡Cita reservada con éxito!');
        this.router.navigate(['/paciente/mis-citas']);
      },
      error: () => alert('Error al reservar la cita')
    });
  }
}
