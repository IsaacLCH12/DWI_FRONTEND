import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class MedicoService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/medicos`;

  getAllMedicos() {
    return this.http.get<any[]>(this.url);
  }

  getMedicosPorFiltro(sedeId: number, servicioId: number) {
    return this.http.get<any[]>(`${this.url}/filtrar?sedeId=${sedeId}&servicioId=${servicioId}`);
  }

  crearMedico(data: any) {
    return this.http.post(this.url, data);
  }

  actualizarMedico(id: number, data: any) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  cambiarEstadoMedico(id: number) {
    return this.http.patch(`${this.url}/${id}/estado`, {});
  }
}
