import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../../../core/services/paciente.service';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mi-perfil.html',
  styleUrls: ['./mi-perfil.scss']
})
export class MiPerfil implements OnInit {
  private pacienteService = inject(PacienteService);
  usuarioId = localStorage.getItem('usuarioId') || '';
  pacienteData: any = {};

  ngOnInit() {
    if(this.usuarioId) {
      this.pacienteService.getPaciente(this.usuarioId).subscribe((res: any) => {
        this.pacienteData = res;
      });
    }
  }

  actualizarPerfil() {
    this.pacienteService.actualizarPaciente(this.usuarioId, this.pacienteData).subscribe({
      next: () => alert('Perfil actualizado con éxito'),
      error: () => alert('Error al intentar actualizar los datos')
    });
  }
}
