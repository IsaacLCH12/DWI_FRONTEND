import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { CitaService } from '../../../core/services/cita.service';

@Component({
  selector: 'app-historial-citas',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './historial-citas.html',
  styleUrls: ['./historial-citas.scss']
})
export class HistorialCitas implements OnInit {
  private citaSrv = inject(CitaService);
  citasPasadas: any[] = [];
  cargando = true;

  ngOnInit() {
    this.cargando = true;
    this.citaSrv.getAllCitas().subscribe({
      next: (res: any[]) => {
        this.citasPasadas = res.filter((c: any) => c.estado !== 'PENDIENTE');
        this.cargando = false;
      },
      error: () => {
        this.citasPasadas = [];
        this.cargando = false;
      }
    });
  }
}
