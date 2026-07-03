import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaService } from '../../../core/services/cita.service';

@Component({
  selector: 'app-historial-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-citas.html',
  styleUrls: ['./historial-citas.scss']
})
export class HistorialCitas implements OnInit {
  citasPasadas: any[] = [];
  private citaService = inject(CitaService);

  ngOnInit() {
    this.citaService.getAllCitas().subscribe((res: any[]) => {
      this.citasPasadas = res.filter((c: any) => c.estado === 'ATENDIDO' || c.estado === 'CANCELADO');
    });
  }
}
