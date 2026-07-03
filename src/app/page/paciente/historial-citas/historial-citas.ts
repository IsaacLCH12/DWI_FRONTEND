import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitaService } from '../../../core/services/cita.service';
import { Cita } from '../../../core/models/cita.model';

@Component({
  selector: 'app-historial-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-citas.html',
  styleUrl: './historial-citas.scss'
})
export class HistorialCitas implements OnInit {

  private citaService = inject(CitaService);

  historial: Cita[] = [];

  cargando = true;

  error = '';

  ngOnInit(): void {
    this.obtenerHistorial();
  }

  obtenerHistorial(): void {

    this.citaService.obtenerMisCitas().subscribe({

      next: (data) => {

        this.historial = data.filter(cita =>
          cita.estadoCita !== 'PROGRAMADA'
        );

        this.cargando = false;

      },

      error: () => {

        this.error = 'No se pudo obtener el historial de citas.';

        this.cargando = false;

      }

    });

  }

}