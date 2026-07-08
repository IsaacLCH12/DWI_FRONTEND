import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environment/environment';
import { tap } from 'rxjs';

export interface LoginRequest {
  identificador: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  rol: string;
  usuarioId: number;
}

export interface RegistroRequest {
  nombre: string;
  apellido: string;
  dni: string;
  correo: string;
  telefono: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private url = `${environment.apiUrl}/auth`;

  login(data: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.url}/iniciarSesion`, data).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('rol', res.rol);
        localStorage.setItem('usuarioId', res.usuarioId.toString());
      })
    );
  }

  registro(data: RegistroRequest) {
    return this.http.post(`${this.url}/registrar`, data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('usuarioId');
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRol(): string | null {
    return localStorage.getItem('rol');
  }

  getUsuarioId(): string | null {
    return localStorage.getItem('usuarioId');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    // Verificar si el token JWT ha expirado
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000; // convertir a milisegundos
      return Date.now() < expiry;
    } catch {
      return false;
    }
  }
}
