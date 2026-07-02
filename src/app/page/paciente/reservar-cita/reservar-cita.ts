import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-reservar-cita',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservar-cita.html',
  styleUrls: ['./reservar-cita.scss']
})
export class ReservarCita implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = environment.apiUrl;

  pasoActual = 1;
  sedes: any[] = [];
  servicios: any[] = [];
  medicos: any[] = [];
  horarios: any[] = [];

  // Datos seleccionados por el paciente
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
    this.http.get<any[]>(`${this.apiUrl}/sedes/activas`).subscribe(res => this.sedes = res);
    this.http.get<any[]>(`${this.apiUrl}/servicios/activos`).subscribe(res => this.servicios = res);
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
    // Filtra médicos usando tu endpoint
    this.http.get<any[]>(`${this.apiUrl}/medicos/filtrar?sedeId=${this.reserva.sedeId}&servicioId=${this.reserva.servicioId}`)
      .subscribe(res => this.medicos = res);
  }

  cargarHorarios() {
    this.http.get<any[]>(`${this.apiUrl}/horarios/medico/${this.reserva.medicoId}`)
      .subscribe(res => this.horarios = res);
  }

  confirmarReserva() {
    this.http.post(`${this.apiUrl}/citas`, this.reserva).subscribe({
      next: () => {
        alert('¡Cita reservada con éxito!');
        this.router.navigate(['/paciente/mis-citas']);
      },
      error: (err) => alert('Error al reservar la cita')
    });
  }
}
