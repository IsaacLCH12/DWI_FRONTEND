import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
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
// 💡 1. Importamos el PacienteService
import { PacienteService } from '../../../core/services/paciente.service';

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
  private pacienteSrv = inject(PacienteService); // 💡 2. Lo inyectamos
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  paso = 1;
  sedes: any[] = [];
  servicios: any[] = [];
  medicos: any[] = [];
  horarios: any[] = [];

  fechaCita: string = '';

  // 💡 3. Dejamos el pacienteId en null inicialmente
  reserva = {
    sedeId: null,
    servicioId: null,
    medicoId: null,
    horarioId: null,
    pacienteId: null as number | null
  };

  ngOnInit() {
    // 💡 4. Buscamos el ID real del paciente apenas carga la pantalla
    const usuarioId = this.authService.getUsuarioId();
    if (usuarioId) {
      this.pacienteSrv.getPacientePorUsuarioId(usuarioId).subscribe({
        next: (res: any) => {
          if (res && res.id) {
            this.reserva.pacienteId = res.id;
            // 💡 Agregamos esta línea para atrapar el DNI por si el backend lo exige
            (this.reserva as any).dni = res.dni || (res.usuario && res.usuario.dni);
          }
        },
        error: () => console.error('No se pudo obtener el perfil del paciente')
      });
    }
    this.sedeSrv.getSedesActivas().subscribe({
      next: (res: any[]) => { this.sedes = res; this.cdr.detectChanges(); },
      error: () => console.error('Error al cargar sedes')
    });

    this.servSrv.getServiciosActivos().subscribe({
      next: (res: any[]) => { this.servicios = res; this.cdr.detectChanges(); },
      error: () => console.error('Error al cargar servicios')
    });
  }

  avanzar() {
    if (this.paso === 1 && this.reserva.sedeId && this.reserva.servicioId) {
      this.medSrv.getMedicosPorFiltro(this.reserva.sedeId, this.reserva.servicioId).subscribe({
        next: (res: any[]) => {
          this.medicos = res;
          this.paso++;
          this.cdr.detectChanges();
        },
        error: () => alert('No se pudieron cargar los médicos.')
      });
    } else if (this.paso === 2 && this.reserva.medicoId) {
      this.horSrv.getHorariosMedico(this.reserva.medicoId).subscribe({
        next: (res: any[]) => {
          this.horarios = res;
          this.paso++;
          this.cdr.detectChanges();
        },
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
      this.fechaCita = ''; // Limpiamos la fecha también
      this.horarios = [];
    }
    this.paso--;
    this.cdr.detectChanges();
  }

  confirmar() {
    if (!this.reserva.horarioId || !this.fechaCita) {
      alert('Por favor, selecciona una fecha y un horario.');
      return;
    }

    if (!this.reserva.pacienteId) {
      alert('Error: No se encontró tu perfil de paciente. Ve a "Mi Perfil" y guarda tus datos primero.');
      return;
    }

    const horarioSeleccionado = this.horarios.find(h => h.id === Number(this.reserva.horarioId));
    if (!horarioSeleccionado) return;

    // Armamos el payload final
   const payloadCita = {
      sedeId: this.reserva.sedeId,
      servicioId: this.reserva.servicioId,
      medicoId: this.reserva.medicoId,

      fechaHora: `${this.fechaCita}T${horarioSeleccionado.horaInicio}`
    };

    this.citaSrv.crearCita(payloadCita).subscribe({
      next: () => {
        alert('✅ Cita reservada con éxito');
        this.router.navigate(['/paciente/mis-citas']);
      },
      error: (err) => {
        console.error('Error al reservar:', err);
        alert('Error al reservar la cita. Revisa la consola.');
      }
    });
  }
}
