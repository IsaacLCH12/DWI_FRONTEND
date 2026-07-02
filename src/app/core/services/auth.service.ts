import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IniciarSesionRequest, AuthResponse } from '../../shared/models/auth.interface';
import { environment } from '../../../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: IniciarSesionRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/iniciarSesion`, credentials).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('rol', response.rol);
        localStorage.setItem('usuarioId', response.usuarioId.toString());
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRol(): string | null {
    return localStorage.getItem('rol');
  }

  logout(): void {
    localStorage.clear();
  }
}
