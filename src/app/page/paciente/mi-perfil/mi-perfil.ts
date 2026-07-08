import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { Navbar } from '../../../shared/components/navbar/navbar';
import { PacienteService } from '../../../core/services/paciente.service';
import { AuthService } from '../../../core/services/auth.service';
=======
import { PacienteService } from '../../../../core/services/paciente.service';
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, FormsModule, Navbar],
=======
  imports: [CommonModule, FormsModule],
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b
  templateUrl: './mi-perfil.html',
  styleUrls: ['./mi-perfil.scss']
})
export class MiPerfil implements OnInit {
<<<<<<< HEAD
  private pacienteSrv = inject(PacienteService);
  private authService = inject(AuthService);
  
  usuarioId = this.authService.getUsuarioId() || '';
  pacienteId = '';
  perfil: any = {};
  cargando = true;
  guardando = false;
  mensajeExito = '';
  mensajeError = '';

  ngOnInit() {
    if (this.usuarioId) {
      this.pacienteSrv.getPacientePorUsuarioId(this.usuarioId).subscribe({
        next: (res: any) => {
          if (res) {
            this.pacienteId = String(res.id);
            this.perfil = { ...res };
          } else {
            this.mensajeError = 'No se encontró tu perfil de paciente. Contacta al administrador.';
          }
          this.cargando = false;
        },
        error: () => {
          this.mensajeError = 'Error al cargar tu perfil.';
          this.cargando = false;
        }
=======
  private pacienteService = inject(PacienteService);
  usuarioId = localStorage.getItem('usuarioId') || '';
  pacienteData: any = {};

  ngOnInit() {
    if(this.usuarioId) {
      this.pacienteService.getPaciente(this.usuarioId).subscribe(res => {
        this.pacienteData = res;
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b
      });
    }
  }

<<<<<<< HEAD
  actualizar() {
    if (!this.perfil.nombre || !this.perfil.apellido) {
      this.mensajeError = 'El nombre y apellido son obligatorios.';
      return;
    }
    if (!this.pacienteId) {
      this.mensajeError = 'No se puede actualizar: perfil no encontrado.';
      return;
    }
    this.guardando = true;
    this.mensajeError = '';
    this.mensajeExito = '';
    // Build payload matching PacienteRequestDTO from Swagger
    const payload = {
      usuarioId: Number(this.usuarioId),
      dni: this.perfil.dni || '',
      nombre: this.perfil.nombre,
      apellido: this.perfil.apellido,
      correo: this.perfil.correo || '',
      telefono: this.perfil.telefono || ''
    };
    this.pacienteSrv.actualizarPaciente(this.pacienteId, payload).subscribe({
      next: () => {
        this.guardando = false;
        this.mensajeExito = '✅ Datos actualizados correctamente.';
        setTimeout(() => this.mensajeExito = '', 3000);
      },
      error: () => {
        this.guardando = false;
        this.mensajeError = 'Error al actualizar tus datos. Intenta de nuevo.';
      }
=======
  actualizarPerfil() {
    this.pacienteService.actualizarPaciente(this.usuarioId, this.pacienteData).subscribe({
      next: () => alert('Perfil actualizado con éxito'),
      error: () => alert('Error al intentar actualizar los datos')
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b
    });
  }
}
