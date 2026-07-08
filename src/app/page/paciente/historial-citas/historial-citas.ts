import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { Navbar } from '../../../shared/components/navbar/navbar';
import { CitaService } from '../../../core/services/cita.service';
=======
import { CitaService } from '../../../../core/services/cita.service';
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b

@Component({
  selector: 'app-historial-citas',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, Navbar],
=======
  imports: [CommonModule],
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b
  templateUrl: './historial-citas.html',
  styleUrls: ['./historial-citas.scss']
})
export class HistorialCitas implements OnInit {
<<<<<<< HEAD
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
=======
  citasPasadas: any[] = [];
  private citaService = inject(CitaService);

  ngOnInit() {
    this.citaService.getAllCitas().subscribe(res => {
      this.citasPasadas = res.filter(c => c.estado === 'ATENDIDO' || c.estado === 'CANCELADO');
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b
    });
  }
}
