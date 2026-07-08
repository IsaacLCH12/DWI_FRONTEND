import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { ModalConfirmacion } from '../../../shared/components/modal-confirmacion/modal-confirmacion';
import { SpinnerCarga } from '../../../shared/components/spinner-carga/spinner-carga';
import { CitaService } from '../../../core/services/cita.service';

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [CommonModule, Navbar, ModalConfirmacion, SpinnerCarga],
  templateUrl: './mis-citas.html',
  styleUrls: ['./mis-citas.scss']
})
export class MisCitas implements OnInit {
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
  }
}
