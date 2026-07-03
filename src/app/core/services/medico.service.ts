import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class MedicoService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getMedicosPorFiltro(sedeId: number, servicioId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/medicos/filtrar?sedeId=${sedeId}&servicioId=${servicioId}`);
  }
}
