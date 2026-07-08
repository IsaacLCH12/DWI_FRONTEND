import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/pacientes`;

  getAllPacientes() {
    return this.http.get<any[]>(this.url);
  }

  // Obtener paciente por su usuarioId (filtrando del listado)
  getPacientePorUsuarioId(usuarioId: string): Observable<any> {
    return this.http.get<any[]>(this.url).pipe(
      map((lista: any[]) => lista.find((p: any) => String(p.usuarioId) === String(usuarioId)))
    );
  }

  // Obtener por ID de paciente directamente
  getPaciente(pacienteId: string) {
    return this.http.get<any>(`${this.url}/${pacienteId}`);
  }

  actualizarPaciente(pacienteId: string, data: any) {
    return this.http.put(`${this.url}/${pacienteId}`, data);
  }
}
