import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CitaService } from '../../../core/services/cita.service';
import { PagoService } from '../../../core/services/pago.service'; // 💡 Importamos el servicio de pagos
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './mis-citas.html',
  styleUrls: ['./mis-citas.scss']
})
export class MisCitas implements OnInit {
  private citaSrv = inject(CitaService);
  private pagoSrv = inject(PagoService); // 💡 Lo inyectamos
  private router = inject(Router);

  citas: any[] = [];
  pagosRealizados: any[] = [];
  cargando = true;
      private cdr = inject(ChangeDetectorRef);


  ngOnInit() {
    this.cargarDatos();
    this.cdr.detectChanges();
  }

  // 💡 NUEVO MÉTODO: Carga los pagos primero y luego las citas
  cargarDatos() {
    this.cargando = true;
    this.pagoSrv.getPagos().subscribe({
      next: (pagos: any[]) => {
        this.pagosRealizados = pagos;
        this.cargarMisCitas();
        this.cdr.detectChanges();// Una vez que tenemos los pagos, traemos las citas
      },
      error: () => {
        this.cargarMisCitas(); // Si falla, igual cargamos las citas
      }
    });
  }

  cargarMisCitas() {
    this.citaSrv.getMisCitas().subscribe({
      next: (res: any[]) => {
        this.citas = res.filter(c => c.estadoCita === 'PROGRAMADA' || c.estadoCita === 'CANCELADA')
          .map(c => {
             // 💡 MAGIA: Buscamos si esta cita ya tiene un pago en el historial
             const pagoEncontrado = this.pagosRealizados.find(p => Number(p.citaId) === Number(c.id));
             return {
               ...c,
               yaPagada: !!pagoEncontrado // True si ya pagó, False si no
             };
          });
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  irAPagar(cita: any) {
    this.router.navigate(['/paciente/mis-pagos'], {
      queryParams: {
        citaId: cita.id,
        monto: cita.precioServicio
      }
    });
  }

  cancelar(id: number) {
    if (confirm('¿Estás seguro de que quieres cancelar esta cita?')) {
      this.citaSrv.cancelarCita(id).subscribe({
        next: () => {
          alert('Cita cancelada exitosamente.');
          this.cargarDatos();
        },
        error: () => alert('Error al intentar cancelar la cita.')
      });
    }
  }
}
