import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoService } from '../../../../core/services/pago.service';

@Component({
  selector: 'app-mis-pagos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-pagos.html',
  styleUrls: ['./mis-pagos.scss']
})
export class MisPagos implements OnInit {
  pagos: any[] = [];
  private pagoService = inject(PagoService);

  ngOnInit() {
    this.pagoService.getPagos().subscribe(res => {
      this.pagos = res;
    });
  }
}
