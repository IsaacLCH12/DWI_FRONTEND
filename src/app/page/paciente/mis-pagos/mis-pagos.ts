import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { PagoService } from '../../../core/services/pago.service';

@Component({
  selector: 'app-mis-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './mis-pagos.html',
  styleUrls: ['./mis-pagos.scss']
})
export class MisPagos implements OnInit {
  private pagoSrv = inject(PagoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  pagos: any[] = [];
  cargando = true;
  procesandoPago = false;

  citaIdAPagar: number | null = null;
  montoFijo = 50.00;
  metodoPago = '';

  datosTarjeta = {
    numero: '',
    titular: '',
    expira: '',
    cvv: ''
  };
  numeroOperacionYape = '';

        private cdr = inject(ChangeDetectorRef);


ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['citaId']) {
        this.citaIdAPagar = Number(params['citaId']);
      }
      if (params['monto']) {
        this.montoFijo = Number(params['monto']);
      }
    });
    this.cargarHistorialPagos();
  }

  cargarHistorialPagos() {
    this.cargando = true;
    this.pagoSrv.getPagos().subscribe({
      next: (res: any[]) => {
        this.pagos = res;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.pagos = [];
        this.cargando = false;
      }
    });
  }

  // 💡 NUEVO: Formatear expiración a MM/YY automáticamente
  formatearExpiracion(event: any) {
    let input = event.target.value.replace(/\D/g, '').substring(0, 4); // Solo números, max 4
    if (input.length >= 3) {
      this.datosTarjeta.expira = input.substring(0, 2) + '/' + input.substring(2, 4);
    } else {
      this.datosTarjeta.expira = input;
    }
  }

  soloNumeros(event: any, campo: 'numero' | 'cvv' | 'yape') {
    if (campo === 'yape') {
      this.numeroOperacionYape = event.target.value.replace(/\D/g, '');
    } else {
      this.datosTarjeta[campo] = event.target.value.replace(/\D/g, '');
    }
  }

  formularioValido(): boolean {
    if (!this.metodoPago) return false;

    if (this.metodoPago === 'YAPE' || this.metodoPago === 'PLIN') {
      return this.numeroOperacionYape.trim().length > 4;
    }

    if (this.metodoPago === 'TARJETA') {
      return (
        this.datosTarjeta.numero.length === 16 &&
        this.datosTarjeta.titular.trim().length > 3 &&
        this.datosTarjeta.expira.length === 5 &&
        this.datosTarjeta.cvv.length >= 3
      );
    }

    return false;
  }

  registrarPago() {
    if (!this.formularioValido()) {
      alert('Por favor, completa correctamente todos los datos.');
      return;
    }

    this.procesandoPago = true;

    let operacionFinal = '';
    if (this.metodoPago === 'TARJETA') {
      operacionFinal = 'TXN-' + Math.floor(Math.random() * 1000000);
    } else {
      operacionFinal = this.numeroOperacionYape;
    }

    // 💡 FIX CRÍTICO: Nombres exactos que pide tu DTO en Spring Boot
    const payload = {
      citaId: this.citaIdAPagar,
      montoTotal: this.montoFijo, // Tu backend exige montoTotal
      metodoPago: this.metodoPago,
      numeroOperacion: operacionFinal,
      estado: 'PENDIENTE', // Tu backend exige el estado inicial
      fechaPago: new Date().toISOString().split('.')[0] // Tu backend exige LocalDateTime (Ej: 2026-07-09T17:43:00)
    };

    this.pagoSrv.crearPago(payload).subscribe({
      next: () => {
        alert('✅ ¡Pago procesado exitosamente! Tu cita está confirmada.');
        this.procesandoPago = false;

        this.citaIdAPagar = null;
        this.metodoPago = '';
        this.datosTarjeta = { numero: '', titular: '', expira: '', cvv: '' };
        this.numeroOperacionYape = '';

        this.router.navigate(['/paciente/mis-pagos']);
        this.cargarHistorialPagos();
      },
      error: (err) => {
        console.error(err);
        alert('Hubo un problema al procesar el pago. Revisa la consola.');
        this.procesandoPago = false;
      }
    });
  }
}
