import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { Navbar } from '../../../shared/components/navbar/navbar';
import { ModalConfirmacion } from '../../../shared/components/modal-confirmacion/modal-confirmacion';
import { SpinnerCarga } from '../../../shared/components/spinner-carga/spinner-carga';
import { CitaService } from '../../../core/services/cita.service';
=======
import { CitaService } from '../../../../core/services/cita.service';
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b

@Component({
  selector: 'app-mis-citas',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, Navbar, ModalConfirmacion, SpinnerCarga],
=======
  imports: [CommonModule],
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b
  templateUrl: './mis-citas.html',
  styleUrls: ['./mis-citas.scss']
})
export class MisCitas implements OnInit {
<<<<<<< HEAD
  private citaSrv = inject(CitaService);
  citas: any[] = [];
  cargando = true; mostrarModal = false; idCita = 0;

  ngOnInit() { this.cargar(); }

  cargar() {
    this.cargando = true;
    this.citaSrv.getAllCitas().subscribe({
      next: (res: any[]) => {
        this.citas = res.filter((c: any) => c.estado === 'PENDIENTE');
        this.cargando = false;
      },
      error: () => {
        this.citas = [];
        this.cargando = false;
      }
    });
  }

  abrirModal(id: number) { this.idCita = id; this.mostrarModal = true; }
  cerrarModal() { this.mostrarModal = false; }

  cancelar() {
    this.citaSrv.cancelarCita(this.idCita).subscribe({
      next: () => { this.mostrarModal = false; this.cargar(); },
      error: () => { this.mostrarModal = false; alert('Error al cancelar la cita'); }
    });
=======
  private citaService = inject(CitaService);
  citasPendientes: any[] = [];

  ngOnInit() {
    this.cargarCitas();
  }

  cargarCitas() {
    this.citaService.getAllCitas().subscribe(res => {
      this.citasPendientes = res.filter(c => c.estado === 'PENDIENTE'); 
    });
  }

  cancelarCita(citaId: number) {
    if (confirm('¿Estás seguro de cancelar esta cita?')) {
      this.citaService.cancelarCita(citaId).subscribe({
        next: () => {
          alert('Cita cancelada exitosamente');
          this.cargarCitas();
        },
        error: () => alert('Hubo un error al intentar cancelar')
      });
    }
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b
  }
}
