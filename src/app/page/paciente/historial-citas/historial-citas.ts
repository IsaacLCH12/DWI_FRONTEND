import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  citasPasadas: any[] = [];
  cargando = true;

  ngOnInit() {
    this.cargarHistorial();
  }

  cargarHistorial() {
    this.cargando = true;
    this.citaSrv.getHistorial().subscribe({
      next: (res: any[]) => {
        this.citasPasadas = res;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.citasPasadas = [];
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}
