import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class CitaService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAllCitas() {
    return this.http.get<any[]>(`${this.apiUrl}/citas`);
  }

  crearCita(reserva: any) {
    return this.http.post(`${this.apiUrl}/citas`, reserva);
  }

  cancelarCita(citaId: number) {
    return this.http.put(`${this.apiUrl}/citas/${citaId}/cancelar`, {});
  }
}
