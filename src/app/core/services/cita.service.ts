import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class CitaService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/citas`;

  getAllCitas() {
    return this.http.get<any[]>(this.url);
  }

  crearCita(data: any) {
    return this.http.post(this.url, data);
  }

  cancelarCita(id: number) {
    return this.http.put(`${this.url}/${id}/cancelar`, {});
  }
}
