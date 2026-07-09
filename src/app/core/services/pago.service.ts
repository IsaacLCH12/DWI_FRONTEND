import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class PagoService {
  private http = inject(HttpClient);

  // 💡 ¡Aquí está la variable que TypeScript no encontraba!
  private url = `${environment.apiUrl}/pagos`;

  // Corresponde al GET /api/pagos (Historial de pagos)
  getPagos() {
    return this.http.get<any[]>(this.url);
  }

  // Corresponde al POST /api/pagos (Registrar un nuevo pago)
  crearPago(payload: any) {
    return this.http.post(this.url, payload);
  }

  // Corresponde al PUT /api/pagos/{id} (Para cuando el Admin apruebe el pago)
  actualizarPago(id: number, payload: any) {
    return this.http.put(`${this.url}/${id}`, payload);
  }
}
