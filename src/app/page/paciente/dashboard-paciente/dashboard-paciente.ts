import { Component, inject, OnInit } from '@angular/core';
<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { PacienteService } from '../../../core/services/paciente.service';
import { ServicioService } from '../../../core/services/servicio.service';
import { MedicoService } from '../../../core/services/medico.service';
import { SedeService } from '../../../core/services/sede.service';
import { AuthService } from '../../../core/services/auth.service';
=======
import { RouterLink } from '@angular/router';
import { PacienteService } from '../../../../core/services/paciente.service';
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b

@Component({
  selector: 'app-dashboard-paciente',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, RouterLink, Navbar],
=======
  imports: [RouterLink],
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b
  templateUrl: './dashboard-paciente.html',
  styleUrls: ['./dashboard-paciente.scss']
})
export class DashboardPaciente implements OnInit {
  private pacienteService = inject(PacienteService);
<<<<<<< HEAD
  private servicioService = inject(ServicioService);
  private medicoService = inject(MedicoService);
  private sedeService = inject(SedeService);
  private authService = inject(AuthService);

  nombrePaciente = 'Paciente';
  especialidades: any[] = [];
  medicos: any[] = [];
  sedes: any[] = [];
  cargandoEspecialidades = true;
  cargandoMedicos = true;

  tarjetas = [
    { titulo: 'Reservar Cita', desc: 'Agenda tu atención médica fácilmente', icono: '📅', ruta: '/paciente/reservar', color: '#dbeafe' },
    { titulo: 'Mis Citas', desc: 'Revisa y gestiona tus citas pendientes', icono: '🩺', ruta: '/paciente/mis-citas', color: '#dcfce7' },
    { titulo: 'Historial', desc: 'Consulta tu historial de atenciones', icono: '📂', ruta: '/paciente/historial', color: '#fce7f3' },
    { titulo: 'Mis Pagos', desc: 'Revisa tus comprobantes de pago', icono: '💳', ruta: '/paciente/mis-pagos', color: '#fef3c7' },
    { titulo: 'Mi Perfil', desc: 'Actualiza tus datos personales', icono: '👤', ruta: '/paciente/mi-perfil', color: '#ede9fe' },
  ];

  ngOnInit() {
    const usuarioId = this.authService.getUsuarioId();
    if (usuarioId) {
      this.pacienteService.getPacientePorUsuarioId(usuarioId).subscribe({
        next: (res: any) => {
          if (res) this.nombrePaciente = res.nombre || 'Paciente';
        },
        error: () => this.nombrePaciente = 'Paciente'
      });
    }
    this.servicioService.getServiciosActivos().subscribe({
      next: (res: any[]) => { this.especialidades = res; this.cargandoEspecialidades = false; },
      error: () => { this.especialidades = []; this.cargandoEspecialidades = false; }
    });
    
    // Obtener los doctores públicos
    this.medicoService.getAllMedicos().subscribe({
      next: (res: any[]) => { 
        // Filtrar solo los activos
        this.medicos = res.filter(m => m.estado !== false); 
        this.cargandoMedicos = false; 
      },
      error: () => { this.medicos = []; this.cargandoMedicos = false; }
    });

    // Obtener las sedes para el footer
    this.sedeService.getSedesActivas().subscribe({
      next: (res: any[]) => this.sedes = res,
      error: () => this.sedes = []
    });
=======
  nombrePaciente = 'Cargando...'; // Texto por defecto mientras consulta a la BD

  ngOnInit() {
    const id = localStorage.getItem('usuarioId');
    if (id) {
      this.pacienteService.getPaciente(id).subscribe(res => {
        this.nombrePaciente = res.nombre; // Aquí atrapamos el nombre real
      });
    }
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b
  }
}
