import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicoService } from '../../../core/services/medico.service';

@Component({
  selector: 'app-gestion-medicos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-medicos.html',
  styleUrls: ['./gestion-medicos.scss']
})
export class GestionMedicos implements OnInit {
  private medicoService = inject(MedicoService);
  listaMedicos: any[] = [];

  ngOnInit() {
    this.medicoService.getAllMedicos().subscribe((res: any[]) => {
      this.listaMedicos = res;
    });
  }
}
