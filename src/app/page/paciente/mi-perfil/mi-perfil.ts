import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { PacienteService } from '../../../core/services/paciente.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './mi-perfil.html',
  styleUrls: ['./mi-perfil.scss']
})
export class MiPerfil implements OnInit {
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
      });
    }
  }

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
    });
  }
}
