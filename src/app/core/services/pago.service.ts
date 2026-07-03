import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago } from '../models/pago.model';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private http = inject(HttpClient);

  private api = 'http://localhost:8081/api/pagos';

  obtenerPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.api);
  }

}