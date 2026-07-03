import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getPaciente(id: string) {
    return this.http.get<any>(`${this.apiUrl}/pacientes/${id}`);
  }

  actualizarPaciente(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/pacientes/${id}`, data);
  }
}
