import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class PagoService {
  private http = inject(HttpClient);
  getPagos() {
    return this.http.get<any[]>(`${environment.apiUrl}/pagos`);
  }
}
