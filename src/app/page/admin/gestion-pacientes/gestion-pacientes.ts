import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { PacienteService } from '../../../core/services/paciente.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-gestion-pacientes',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './gestion-pacientes.html',
  styleUrls: ['./gestion-pacientes.scss']
})
export class GestionPacientes implements OnInit {
  private pacienteService = inject(PacienteService);
  private cdr = inject(ChangeDetectorRef);
  
  listaPacientes: any[] = [];
  cargando = true;
  
  ngOnInit() {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.cargando = true;
    this.pacienteService.getAllPacientes().subscribe({
      next: (res: any[]) => { this.listaPacientes = res; this.cargando = false; this.cdr.detectChanges(); },
      error: () => { this.listaPacientes = []; this.cargando = false; this.cdr.detectChanges(); }
    });
  }
}
