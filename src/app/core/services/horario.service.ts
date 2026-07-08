import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class HorarioService {
  private http = inject(HttpClient);
  getHorariosMedico(medicoId: number) {
    return this.http.get<any[]>(`${environment.apiUrl}/horarios/medico/${medicoId}`);
  }
}
