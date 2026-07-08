import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { Navbar } from '../../../shared/components/navbar/navbar';
import { SedeService } from '../../../core/services/sede.service';
import { ServicioService } from '../../../core/services/servicio.service';
import { MedicoService } from '../../../core/services/medico.service';
import { HorarioService } from '../../../core/services/horario.service';
import { CitaService } from '../../../core/services/cita.service';
import { AuthService } from '../../../core/services/auth.service';
=======
// Importamos tus nuevos servicios específicos
import { SedeService } from '../../../../core/services/sede.service';
import { ServicioService } from '../../../../core/services/servicio.service';
import { MedicoService } from '../../../../core/services/medico.service';
import { HorarioService } from '../../../../core/services/horario.service';
import { CitaService } from '../../../../core/services/cita.service';
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b

@Component({
  selector: 'app-reservar-cita',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, FormsModule, Navbar],
=======
  imports: [CommonModule, FormsModule],
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b
  templateUrl: './reservar-cita.html',
  styleUrls: ['./reservar-cita.scss']
})
export class ReservarCita implements OnInit {
<<<<<<< HEAD
  private sedeSrv = inject(SedeService);
  private servSrv = inject(ServicioService);
  private medSrv = inject(MedicoService);
  private horSrv = inject(HorarioService);
  private citaSrv = inject(CitaService);
  private authService = inject(AuthService);
  private router = inject(Router);

  paso = 1;
  sedes: any[] = []; servicios: any[] = []; medicos: any[] = []; horarios: any[] = [];
  reserva = { sedeId: null, servicioId: null, medicoId: null, horarioId: null, pacienteId: this.authService.getUsuarioId() };

  ngOnInit() {
    this.sedeSrv.getSedesActivas().subscribe({
      next: (res: any[]) => this.sedes = res,
      error: () => console.error('Error al cargar sedes')
    });
    this.servSrv.getServiciosActivos().subscribe({
      next: (res: any[]) => this.servicios = res,
      error: () => console.error('Error al cargar servicios')
    });
  }

  avanzar() {
    if (this.paso === 1 && this.reserva.sedeId && this.reserva.servicioId) {
      this.medSrv.getMedicosPorFiltro(this.reserva.sedeId, this.reserva.servicioId).subscribe({
        next: (res: any[]) => { this.medicos = res; this.paso++; },
        error: () => console.error('Error al cargar médicos')
      });
    } else if (this.paso === 2 && this.reserva.medicoId) {
      this.horSrv.getHorariosMedico(this.reserva.medicoId).subscribe({
        next: (res: any[]) => { this.horarios = res; this.paso++; },
        error: () => console.error('Error al cargar horarios')
      });
    }
  }

  retroceder() {
    if (this.paso === 2) {
      this.reserva.medicoId = null;
      this.medicos = [];
    } else if (this.paso === 3) {
      this.reserva.horarioId = null;
      this.horarios = [];
    }
    this.paso--;
  }

  confirmar() {
    this.citaSrv.crearCita(this.reserva).subscribe({
      next: () => { alert('Cita reservada con éxito'); this.router.navigate(['/paciente/mis-citas']); },
      error: () => alert('Error al reservar')
=======
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
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b
    });
  }
}
