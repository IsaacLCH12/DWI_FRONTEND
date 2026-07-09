import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
      private cdr = inject(ChangeDetectorRef);


  usuarioId = '';
  pacienteId = '';
  perfil: any = {};
  cargando = true;
  guardando = false;
  mensajeExito = '';
  mensajeError = '';

  ngOnInit() {
    // 💡 Extraemos el ID de forma segura al inicializar
    this.usuarioId = this.authService.getUsuarioId() || '';

    if (this.usuarioId) {
      this.pacienteSrv.getPacientePorUsuarioId(this.usuarioId).subscribe({
       next: (res: any) => {
          if (res) {
            this.pacienteId = String(res.id);
            this.perfil = { ...res };
            // 💡 Vamos a buscar el DNI dentro de la relación con la tabla usuarios
            this.perfil.dni = res.usuario?.dni || res.dni || '';
          } else {
            this.mensajeError = 'No se encontró tu perfil de paciente. Contacta al administrador.';
          }
          this.cargando = false;
                          this.cdr.detectChanges(); // Forzamos actualización visual

        },
        error: () => {
          this.mensajeError = 'Error al cargar tu perfil.';
          this.cargando = false; // 💡 Apagamos el loading
        }
      });
    } else {
      // 💡 Si no hay ID, apagamos el loading y mostramos error
      this.mensajeError = 'Sesión no válida. Por favor vuelve a iniciar sesión.';
      this.cargando = false;
    }
  }

 actualizar() {
    // 1. Validamos Nombre y Apellido
    if (!this.perfil.nombre || !this.perfil.apellido) {
      this.mensajeError = 'El nombre y apellido son obligatorios.';
      this.cdr.detectChanges();
      return;
    }

    // 💡 2. NUEVO: Validamos el DNI en Angular antes de mandarlo a Java
    if (!this.perfil.dni || String(this.perfil.dni).trim().length !== 8) {
      this.mensajeError = 'El DNI es obligatorio y debe tener exactamente 8 números.';
      this.cdr.detectChanges();
      return;
    }

    if (!this.pacienteId) {
      this.mensajeError = 'No se puede actualizar: perfil no encontrado.';
      this.cdr.detectChanges();
      return;
    }

    this.guardando = true;
    this.mensajeError = '';
    this.mensajeExito = '';

    const payload = {
      usuarioId: Number(this.usuarioId),
      dni: String(this.perfil.dni).trim(), // Nos aseguramos de mandarlo limpio
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
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.guardando = false;
        console.error("Error del backend:", err);
        this.mensajeError = 'Error al actualizar tus datos. Intenta de nuevo.';
        this.cdr.detectChanges();
      }
    });
  }
}
