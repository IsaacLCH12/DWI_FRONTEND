import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { PagoService } from '../../../core/services/pago.service';

@Component({
  selector: 'app-gestion-pagos',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './gestion-pagos.html',
  styleUrls: ['./gestion-pagos.scss']
})
export class GestionPagos implements OnInit {
  private pagoSrv = inject(PagoService);

  pagos: any[] = [];
  cargando = true;
      private cdr = inject(ChangeDetectorRef);


  ngOnInit() {
    this.cargarTodosLosPagos();
  }

  cargarTodosLosPagos() {
    this.cargando = true;
    this.pagoSrv.getPagos().subscribe({
      next: (res: any[]) => {
        this.pagos = res;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Error al cargar la lista central de pagos.');
        this.cargando = false;
      }
    });
  }

 validarPago(pago: any) {
    if (confirm(`¿Confirmas que el dinero de la Cita #${pago.citaId} ingresó a la cuenta de la clínica?`)) {

      // 💡 FIX: Armamos el paquete EXACTO que exige tu backend (Igual que al crear)
      const payload = {
        citaId: pago.citaId,
        montoTotal: pago.montoTotal || pago.monto, // Aseguramos que se llame montoTotal
        metodoPago: pago.metodoPago,
        numeroOperacion: pago.numeroOperacion,
        estado: 'VALIDADO',
        // Generamos la fecha en el formato estricto que exige Spring Boot (Ej: 2026-07-09T17:43:00)
        fechaPago: new Date().toISOString().split('.')[0]
      };

      this.pagoSrv.actualizarPago(pago.id, payload).subscribe({
        next: () => {
          alert('✅ Pago validado con éxito. La cita asociada cambiará a APROBADA.');
          this.cargarTodosLosPagos(); // Recargamos la tabla
        },
        error: (err) => {
          console.error('Error del backend:', err);
          alert('Hubo un error al procesar la validación del pago.');
        }
      });
    }
  }

  rechazarPago(pago: any) {
    if (confirm(`¿Deseas RECHAZAR el pago de la Cita #${pago.citaId}?`)) {

      // 💡 FIX: Armamos el paquete EXACTO
      const payload = {
        citaId: pago.citaId,
        montoTotal: pago.montoTotal || pago.monto,
        metodoPago: pago.metodoPago,
        numeroOperacion: pago.numeroOperacion,
        estado: 'RECHAZADO',
        fechaPago: new Date().toISOString().split('.')[0]
      };

      this.pagoSrv.actualizarPago(pago.id, payload).subscribe({
        next: () => {
          alert('❌ El pago ha sido marcado como RECHAZADO.');
          this.cargarTodosLosPagos(); // Recargamos la tabla
        },
        error: (err) => {
          console.error('Error del backend:', err);
          alert('Hubo un error al rechazar el pago.');
        }
      });
    }
  }

  getBadgeClass(estado: string): string {
    switch (estado?.toUpperCase()) {
      case 'VALIDADO': return 'badge-success';
      case 'PENDIENTE': return 'badge-warning';
      case 'RECHAZADO': return 'badge-danger';
      default: return 'badge-secondary';
    }
  }
}
