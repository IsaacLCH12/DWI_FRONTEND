import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { PagoService } from '../../../core/services/pago.service';
import { Pago } from '../../../core/models/pago.model';

@Component({
  selector: 'app-mis-pagos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-pagos.html',
  styleUrl: './mis-pagos.scss'
})
export class MisPagos implements OnInit {

  private pagoService = inject(PagoService);

  pagos: Pago[] = [];

  cargando = true;
  error = '';

  totalPagado = 0;
  totalPendiente = 0;

  ngOnInit(): void {
    this.obtenerPagos();
  }

  obtenerPagos() {

    this.pagoService.obtenerPagos().subscribe({

      next: (data) => {

        this.pagos = data;

        this.totalPagado = this.pagos
          .filter(p => p.estado === 'PAGADO')
          .reduce((a, b) => a + b.montoTotal, 0);

        this.totalPendiente = this.pagos
          .filter(p => p.estado !== 'PAGADO')
          .reduce((a, b) => a + b.montoTotal, 0);

        this.cargando = false;

      },

      error: () => {

        this.error = 'No fue posible cargar los pagos.';
        this.cargando = false;

      }

    });

  }

}
