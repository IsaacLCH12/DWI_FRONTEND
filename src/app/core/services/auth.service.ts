import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/auth`;

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/iniciarSesion`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('rol', response.rol);
        localStorage.setItem('usuarioId', response.usuarioId.toString());
      })
    );
  }

  // 💡 NUEVO MÉTODO PARA EL REGISTRO
  registro(datosPaciente: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/registrar`, datosPaciente);
  }

  getToken(): string | null { return localStorage.getItem('token'); }
  getRol(): string | null { return localStorage.getItem('rol'); }
  logout(): void { localStorage.clear(); }
}
