import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

export interface HorarioRequest {
  medicoId: number;
  diaSemana: number;
  javaHoraInicio: string;
  javaHoraFin: string;
}

@Injectable({ providedIn: 'root' })
export class HorarioService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/horarios`;

  // El que usa el Paciente (Ya lo tienes)
  getHorariosMedico(medicoId: number) {
    return this.http.get<any[]>(`${this.url}/medico/${medicoId}`);
  }

  // El que usará el Admin para crear (NUEVO)
  crearHorario(data: HorarioRequest) {
    return this.http.post(this.url, data);
  }

  // El que usará el Admin para eliminar (NUEVO)
  eliminarHorario(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
