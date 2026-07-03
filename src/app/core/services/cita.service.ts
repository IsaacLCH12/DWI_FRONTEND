import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private http = inject(HttpClient);

  private api = 'http://localhost:8081/api/citas';

  obtenerMisCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.api);
  }

}