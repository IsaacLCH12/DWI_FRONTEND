import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { ModalConfirmacion } from '../../../shared/components/modal-confirmacion/modal-confirmacion';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SedeService } from '../../../core/services/sede.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-gestion-sedes',
  standalone: true,
  imports: [CommonModule, Sidebar, ReactiveFormsModule, ModalConfirmacion],
  templateUrl: './gestion-sedes.html',
  styleUrls: ['./gestion-sedes.scss']
})
export class GestionSedes implements OnInit {
  private sedeService = inject(SedeService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  listaSedes: any[] = [];
  cargando = true;

  mostrarModalForm = false;
  mostrarModalConfirm = false;
  sedeSeleccionada: any = null;
  modoEdicion = false;
  guardando = false;

  sedeForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    direccion: ['', Validators.required],
    telefonoContacto: ['', [Validators.required, Validators.pattern(/^[0-9\+\-\(\)\s]+$/)]],
    estado: [true]
  });

  ngOnInit() {
    this.cargarSedes();
  }

  cargarSedes() {
    this.cargando = true;
    this.sedeService.getAllSedes().subscribe({
      next: (res: any[]) => { this.listaSedes = res; this.cargando = false; this.cdr.detectChanges(); },
      error: () => { this.listaSedes = []; this.cargando = false; this.cdr.detectChanges(); }
    });
  }

  abrirCrear() {
    this.modoEdicion = false;
    this.sedeSeleccionada = null;
    this.sedeForm.reset({ estado: true });
    this.mostrarModalForm = true;
  }

  abrirEditar(sede: any) {
    this.modoEdicion = true;
    this.sedeSeleccionada = sede;
    this.sedeForm.patchValue({
      nombre: sede.nombre,
      direccion: sede.direccion,
      telefonoContacto: sede.telefonoContacto,
      estado: sede.estado
    });
    this.mostrarModalForm = true;
  }

  abrirEliminar(sede: any) {
    this.sedeSeleccionada = sede;
    this.mostrarModalConfirm = true;
  }

  guardar() {
    if (this.sedeForm.invalid) return;
    this.guardando = true;

    const obs = this.modoEdicion
      ? this.sedeService.actualizarSede(this.sedeSeleccionada.id, this.sedeForm.value)
      : this.sedeService.crearSede(this.sedeForm.value);

    obs.subscribe({
      next: () => {
        this.guardando = false;
        this.mostrarModalForm = false;
        this.cargarSedes();
      },
      error: () => {
        this.guardando = false;
        alert('Ocurrió un error al guardar.');
      }
    });
  }

  eliminar() {
    if (!this.sedeSeleccionada) return;
    this.sedeService.deshabilitarSede(this.sedeSeleccionada.id).subscribe({
      next: () => {
        this.mostrarModalConfirm = false;
        this.cargarSedes();
      },
      error: () => {
        this.mostrarModalConfirm = false;
        alert('Ocurrió un error al deshabilitar la sede.');
      }
    });
  }
}
