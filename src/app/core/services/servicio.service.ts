import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class ServicioService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/servicios`;

  getServiciosActivos() {
    return this.http.get<any[]>(`${this.url}/activos`);
  }

  getAllServicios() {
    return this.http.get<any[]>(this.url);
  }

  crearServicio(data: any) {
    return this.http.post(this.url, data);
  }

  actualizarServicio(id: number, data: any) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  deshabilitarServicio(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
