import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { PagoService } from '../../../core/services/pago.service';

@Component({
  selector: 'app-mis-pagos',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './mis-pagos.html',
  styleUrls: ['./mis-pagos.scss']
})
export class MisPagos implements OnInit {
  private pagoSrv = inject(PagoService);
  pagos: any[] = [];
  cargando = true;

  ngOnInit() {
    this.cargando = true;
    this.pagoSrv.getPagos().subscribe({
      next: (res: any[]) => {
        this.pagos = res;
        this.cargando = false;
      },
      error: () => {
        this.pagos = [];
        this.cargando = false;
      }
    });
  }
}
