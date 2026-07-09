import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { CitaService } from '../../../core/services/cita.service';

@Component({
  selector: 'app-gestion-citas',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './gestion-citas.html',
  styleUrls: ['./gestion-citas.scss']
})
export class GestionCitas implements OnInit {
  private citaSrv = inject(CitaService);

  citas: any[] = [];
  cargando = true;
    private cdr = inject(ChangeDetectorRef);


  ngOnInit() {
    this.cargarCitas();
  }

  cargarCitas() {
    this.cargando = true;
    this.citaSrv.getAllCitas().subscribe({
      next: (res: any[]) => {
        this.citas = res;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Error al cargar las citas');
        this.cargando = false;
      }
    });
  }

  cambiarEstado(cita: any, nuevoEstado: string) {
    if (confirm(`¿Estás seguro de marcar esta cita como ${nuevoEstado}?`)) {
      // Reutilizamos el objeto de la cita pero le cambiamos el estado
      const payload = { ...cita, estadoCita: nuevoEstado };

      this.citaSrv.actualizarCita(cita.id, payload).subscribe({
        next: () => {
          alert(`Cita ${nuevoEstado} exitosamente.`);
          this.cargarCitas(); // Refrescar la tabla

        },
        error: () => alert('Hubo un error al actualizar la cita')
      });
    }
  }

  cancelar(id: number) {
    if (confirm('¿Deseas cancelar esta cita definitivamente?')) {
      this.citaSrv.cancelarCita(id).subscribe({
        next: () => this.cargarCitas(),
        error: () => alert('Error al cancelar la cita')
      });
    }
  }

  // Utilidad para los colores de las etiquetas
  getBadgeClass(estado: string): string {
    switch(estado?.toUpperCase()) {
      case 'PROGRAMADA': return 'badge-warning';
      case 'APROBADA': return 'badge-success';
      case 'CANCELADA': return 'badge-danger';
      case 'ATENDIDA': return 'badge-info';
      default: return 'badge-secondary';
    }
  }
}
