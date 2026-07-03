import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class ServicioService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getServiciosActivos() {
    return this.http.get<any[]>(`${this.apiUrl}/servicios/activos`);
  }
}
