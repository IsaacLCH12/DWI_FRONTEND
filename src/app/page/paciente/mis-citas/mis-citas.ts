import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaService } from '../../../core/services/cita.service';
import { ModalConfirmacion } from '../../../shared/components/modal-confirmacion/modal-confirmacion';
import { SpinnerCarga } from '../../../shared/components/spinner-carga/spinner-carga';

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [CommonModule, ModalConfirmacion, SpinnerCarga],
  templateUrl: './mis-citas.html',
  styleUrls: ['./mis-citas.scss']
})
export class MisCitas implements OnInit {
  private citaService = inject(CitaService);
  citasPendientes: any[] = [];
  
  cargandoDatos = true;
  mostrarModal = false;
  idCitaACancelar: number | null = null;

  ngOnInit() {
    this.cargarCitas();
  }

  cargarCitas() {
    this.cargandoDatos = true;
    this.citaService.getAllCitas().subscribe((res: any[]) => {
      this.citasPendientes = res.filter((c: any) => c.estado === 'PENDIENTE'); 
      this.cargandoDatos = false;
    });
  }

  abrirModalCancelacion(citaId: number) {
    this.idCitaACancelar = citaId;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.idCitaACancelar = null;
  }

  ejecutarCancelacionReal() {
    if (this.idCitaACancelar) {
      this.citaService.cancelarCita(this.idCitaACancelar).subscribe({
        next: () => {
          this.mostrarModal = false;
          this.cargarCitas();
        },
        error: () => {
          alert('Hubo un error al intentar cancelar');
          this.mostrarModal = false;
        }
      });
    }
  }
}
