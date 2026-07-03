import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SedeService } from '../../../../core/services/sede.service';

@Component({
  selector: 'app-gestion-sedes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-sedes.html',
  styleUrls: ['./gestion-sedes.scss']
})
export class GestionSedes implements OnInit {
  private sedeService = inject(SedeService);
  listaSedes: any[] = [];

  ngOnInit() {
    this.sedeService.getSedesActivas().subscribe((res: any[]) => {
      this.listaSedes = res;
    });
  }
}
