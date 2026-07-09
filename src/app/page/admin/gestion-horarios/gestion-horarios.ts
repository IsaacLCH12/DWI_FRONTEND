import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { MedicoService } from '../../../core/services/medico.service';
import { HorarioService, HorarioRequest } from '../../../core/services/horario.service';

@Component({
  selector: 'app-gestion-horarios',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './gestion-horarios.html',
  styleUrls: ['./gestion-horarios.scss']
})
export class GestionHorarios implements OnInit {
  private medSrv = inject(MedicoService);
  private horSrv = inject(HorarioService);

  medicos: any[] = [];
  horariosActuales: any[] = [];

  medicoSeleccionado: number | null = null;

  // 💡 Adaptado a la Base de Datos
  nuevoHorario = { diaSemana: null, horaInicio: '', horaFin: '' };

  cargandoHorarios = false;
  guardando = false;

  ngOnInit() {
    this.medSrv.getAllMedicos().subscribe({
      next: (res: any[]) => this.medicos = res,
      error: () => console.error('Error al cargar médicos')
    });
  }

  cargarHorariosMedico() {
    if (!this.medicoSeleccionado) return;
    this.cargandoHorarios = true;
    this.horSrv.getHorariosMedico(this.medicoSeleccionado).subscribe({
      next: (res: any[]) => { this.horariosActuales = res; this.cargandoHorarios = false; },
      error: () => { this.horariosActuales = []; this.cargandoHorarios = false; }
    });
  }

  crearHorario() {
    if (!this.medicoSeleccionado || !this.nuevoHorario.diaSemana || !this.nuevoHorario.horaInicio || !this.nuevoHorario.horaFin) {
      alert('Por favor, completa todos los campos (Día, Hora Inicio y Hora Fin).');
      return;
    }

    this.guardando = true;


    const payload: HorarioRequest = {
      medicoId: this.medicoSeleccionado,
      diaSemana: Number(this.nuevoHorario.diaSemana),

      // 💡 Enviamos los datos con las claves que Spring Boot sí entiende
      javaHoraInicio: this.nuevoHorario.horaInicio.length === 5 ? this.nuevoHorario.horaInicio + ':00' : this.nuevoHorario.horaInicio,
      javaHoraFin: this.nuevoHorario.horaFin.length === 5 ? this.nuevoHorario.horaFin + ':00' : this.nuevoHorario.horaFin
    };

    this.horSrv.crearHorario(payload).subscribe({
      next: () => {
        alert('Horario asignado con éxito');
        this.nuevoHorario = { diaSemana: null, horaInicio: '', horaFin: '' };
        this.cargarHorariosMedico();
        this.guardando = false;
      },
      error: (err) => {
        console.error('Error del backend:', err);
        alert('Error al asignar el horario. Revisa la consola para más detalles.');
        this.guardando = false;
      }
    });
  }

  eliminarHorario(id: number) {
    if (confirm('¿Estás seguro de eliminar este horario?')) {
      this.horSrv.eliminarHorario(id).subscribe({
        next: () => this.cargarHorariosMedico(),
        error: () => alert('Error al eliminar el horario')
      });
    }
  }

  // 💡 Utilidad para mostrar "Lunes" en la tabla en vez de "1"
  obtenerNombreDia(dia: number): string {
    const dias: { [key: number]: string } = {
      1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sábado', 7: 'Domingo'
    };
    return dias[dia] || 'Día';
  }
}
