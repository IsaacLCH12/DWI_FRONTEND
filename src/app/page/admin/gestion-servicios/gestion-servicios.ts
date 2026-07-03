import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../../../../core/services/servicio.service';

@Component({
  selector: 'app-gestion-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-servicios.html',
  styleUrls: ['./gestion-servicios.scss']
})
export class GestionServicios implements OnInit {
  private servicioService = inject(ServicioService);
  listaServicios: any[] = [];

  ngOnInit() {
    this.servicioService.getServiciosActivos().subscribe((res: any[]) => {
      this.listaServicios = res;
    });
  }
}
