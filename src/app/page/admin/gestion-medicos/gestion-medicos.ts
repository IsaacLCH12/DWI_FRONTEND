import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { ModalConfirmacion } from '../../../shared/components/modal-confirmacion/modal-confirmacion';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedicoService } from '../../../core/services/medico.service';
import { SedeService } from '../../../core/services/sede.service';
import { ServicioService } from '../../../core/services/servicio.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-gestion-medicos',
  standalone: true,
  imports: [CommonModule, Sidebar, ReactiveFormsModule, ModalConfirmacion],
  templateUrl: './gestion-medicos.html',
  styleUrls: ['./gestion-medicos.scss']
})
export class GestionMedicos implements OnInit {
  private medicoService = inject(MedicoService);
  private sedeService = inject(SedeService);
  private servicioService = inject(ServicioService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  
  listaMedicos: any[] = [];
  sedesActivas: any[] = [];
  serviciosActivos: any[] = [];
  cargando = true;
  
  mostrarModalForm = false;
  mostrarModalConfirm = false;
  medicoSeleccionado: any = null;
  modoEdicion = false;
  guardando = false;

  medicoForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    fotoUrl: [''],
    sedeId: [null, Validators.required],
    servicioId: [null, Validators.required],
    usuarioId: [null],
    dni: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  ngOnInit() {
    this.cargarMedicos();
    this.sedeService.getSedesActivas().subscribe(res => this.sedesActivas = res);
    this.servicioService.getServiciosActivos().subscribe(res => this.serviciosActivos = res);
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.getAllMedicos().subscribe({
      next: (res: any[]) => { this.listaMedicos = res; this.cargando = false; this.cdr.detectChanges(); },
      error: () => { this.listaMedicos = []; this.cargando = false; this.cdr.detectChanges(); }
    });
  }

  abrirCrear() {
    this.modoEdicion = false;
    this.medicoSeleccionado = null;
    this.medicoForm.reset({ usuarioId: null, fotoUrl: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png', dni: '', correo: '', password: '' });
    // DNI, Correo and Password are required when creating a new Medico
    this.medicoForm.get('dni')?.setValidators([Validators.required]);
    this.medicoForm.get('correo')?.setValidators([Validators.required, Validators.email]);
    this.medicoForm.get('password')?.setValidators([Validators.required]);
    this.medicoForm.get('dni')?.updateValueAndValidity();
    this.medicoForm.get('correo')?.updateValueAndValidity();
    this.medicoForm.get('password')?.updateValueAndValidity();
    this.mostrarModalForm = true;
  }

  abrirEditar(medico: any) {
    this.modoEdicion = true;
    this.medicoSeleccionado = medico;
    
    // El response de getAllMedicos de backend tiene 'nombreSede' y 'nombreServicio'
    // Para rellenar el formulario de edición idealmente tendríamos el sedeId y servicioId crudos en la respuesta.
    // Asumiremos que el backend devuelve sedeId y servicioId en la entidad original si no, dejamos selects en blanco
    this.medicoForm.patchValue({
      nombre: medico.nombre,
      apellido: medico.apellido,
      fotoUrl: medico.fotoUrl || 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
      sedeId: medico.sedeId || null,
      servicioId: medico.servicioId || null,
      usuarioId: medico.usuarioId || 0,
      dni: '',
      correo: '',
      password: ''
    });
    // Optional in edit mode unless we want to change password, but typically we don't update user info from medico edit.
    this.medicoForm.get('dni')?.clearValidators();
    this.medicoForm.get('correo')?.clearValidators();
    this.medicoForm.get('password')?.clearValidators();
    this.medicoForm.get('dni')?.updateValueAndValidity();
    this.medicoForm.get('correo')?.updateValueAndValidity();
    this.medicoForm.get('password')?.updateValueAndValidity();

    this.mostrarModalForm = true;
  }

  abrirCambiarEstado(medico: any) {
    this.medicoSeleccionado = medico;
    this.mostrarModalConfirm = true;
  }

  guardar() {
    if (this.medicoForm.invalid) return;
    this.guardando = true;
    
    const reqData = this.medicoForm.value;
    reqData.sedeId = Number(reqData.sedeId);
    reqData.servicioId = Number(reqData.servicioId);
    if (reqData.usuarioId === null || reqData.usuarioId === 0) {
      delete reqData.usuarioId; 
    }
    // Remove empty user fields if editing
    if (this.modoEdicion || (!reqData.dni && !reqData.correo)) {
      delete reqData.dni;
      delete reqData.correo;
      delete reqData.password;
    }

    const obs = this.modoEdicion 
      ? this.medicoService.actualizarMedico(this.medicoSeleccionado.id, reqData)
      : this.medicoService.crearMedico(reqData);

    obs.subscribe({
      next: () => {
        this.guardando = false;
        this.mostrarModalForm = false;
        this.cargarMedicos();
      },
      error: (err) => {
        this.guardando = false;
        console.error('Error del backend al guardar médico:', err);
        if (err.error && err.error.message) {
          alert('Error: ' + err.error.message);
        } else {
          alert('Ocurrió un error al guardar. Revisa la consola para más detalles.');
        }
      }
    });
  }

  cambiarEstado() {
    if (!this.medicoSeleccionado) return;
    this.medicoService.cambiarEstadoMedico(this.medicoSeleccionado.id).subscribe({
      next: () => {
        this.mostrarModalConfirm = false;
        this.cargarMedicos();
      },
      error: () => {
        this.mostrarModalConfirm = false;
        alert('Ocurrió un error al cambiar el estado del médico.');
      }
    });
  }
}
