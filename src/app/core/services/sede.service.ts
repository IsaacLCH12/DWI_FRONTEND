import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class SedeService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/sedes`;

  getSedesActivas() {
    return this.http.get<any[]>(`${this.url}/activas`);
  }

  getAllSedes() {
    return this.http.get<any[]>(this.url);
  }

  crearSede(data: any) {
    return this.http.post(this.url, data);
  }

  actualizarSede(id: number, data: any) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  deshabilitarSede(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
