import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { SedeService } from '../../../core/services/sede.service';
import { ServicioService } from '../../../core/services/servicio.service';
import { MedicoService } from '../../../core/services/medico.service';
import { HorarioService } from '../../../core/services/horario.service';
import { CitaService } from '../../../core/services/cita.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-reservar-cita',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './reservar-cita.html',
  styleUrls: ['./reservar-cita.scss']
})
export class ReservarCita implements OnInit {
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
    });
  }
}
