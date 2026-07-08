import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { Navbar } from '../../../shared/components/navbar/navbar';
import { PagoService } from '../../../core/services/pago.service';
=======
import { PagoService } from '../../../../core/services/pago.service';
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b

@Component({
  selector: 'app-mis-pagos',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, Navbar],
=======
  imports: [CommonModule],
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b
  templateUrl: './mis-pagos.html',
  styleUrls: ['./mis-pagos.scss']
})
export class MisPagos implements OnInit {
<<<<<<< HEAD
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
=======
  pagos: any[] = [];
  private pagoService = inject(PagoService);

  ngOnInit() {
    this.pagoService.getPagos().subscribe(res => {
      this.pagos = res;
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b
    });
  }
}
