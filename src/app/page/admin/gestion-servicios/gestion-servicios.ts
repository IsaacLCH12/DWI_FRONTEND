import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { ModalConfirmacion } from '../../../shared/components/modal-confirmacion/modal-confirmacion';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicioService } from '../../../core/services/servicio.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-gestion-servicios',
  standalone: true,
  imports: [CommonModule, Sidebar, ReactiveFormsModule, ModalConfirmacion],
  templateUrl: './gestion-servicios.html',
  styleUrls: ['./gestion-servicios.scss']
})
export class GestionServicios implements OnInit {
  private servicioService = inject(ServicioService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  
  listaServicios: any[] = [];
  cargando = true;
  
  mostrarModalForm = false;
  mostrarModalConfirm = false;
  servicioSeleccionado: any = null;
  modoEdicion = false;
  guardando = false;

  servicioForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(0)]],
    duracionMin: [0, [Validators.required, Validators.min(1)]],
    estado: [true]
  });

  ngOnInit() {
    this.cargarServicios();
  }

  cargarServicios() {
    this.cargando = true;
    this.servicioService.getAllServicios().subscribe({
      next: (res: any[]) => { this.listaServicios = res; this.cargando = false; this.cdr.detectChanges(); },
      error: () => { this.listaServicios = []; this.cargando = false; this.cdr.detectChanges(); }
    });
  }

  abrirCrear() {
    this.modoEdicion = false;
    this.servicioSeleccionado = null;
    this.servicioForm.reset({ estado: true, precio: 0, duracionMin: 30 });
    this.mostrarModalForm = true;
  }

  abrirEditar(servicio: any) {
    this.modoEdicion = true;
    this.servicioSeleccionado = servicio;
    this.servicioForm.patchValue({
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      precio: servicio.precio,
      duracionMin: servicio.duracionMin,
      estado: servicio.estado
    });
    this.mostrarModalForm = true;
  }

  abrirEliminar(servicio: any) {
    this.servicioSeleccionado = servicio;
    this.mostrarModalConfirm = true;
  }

  guardar() {
    if (this.servicioForm.invalid) return;
    this.guardando = true;
    
    const obs = this.modoEdicion 
      ? this.servicioService.actualizarServicio(this.servicioSeleccionado.id, this.servicioForm.value)
      : this.servicioService.crearServicio(this.servicioForm.value);

    obs.subscribe({
      next: () => {
        this.guardando = false;
        this.mostrarModalForm = false;
        this.cargarServicios();
      },
      error: () => {
        this.guardando = false;
        alert('Ocurrió un error al guardar.');
      }
    });
  }

  eliminar() {
    if (!this.servicioSeleccionado) return;
    this.servicioService.deshabilitarServicio(this.servicioSeleccionado.id).subscribe({
      next: () => {
        this.mostrarModalConfirm = false;
        this.cargarServicios();
      },
      error: () => {
        this.mostrarModalConfirm = false;
        alert('Ocurrió un error al deshabilitar el servicio.');
      }
    });
  }
}
