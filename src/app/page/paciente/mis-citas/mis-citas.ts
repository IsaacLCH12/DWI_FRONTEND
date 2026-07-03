import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaService } from '../../../../core/services/cita.service';

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-citas.html',
  styleUrls: ['./mis-citas.scss']
})
export class MisCitas implements OnInit {
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
  }
}
