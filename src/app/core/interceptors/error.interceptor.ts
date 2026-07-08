import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, timeout, throwError } from 'rxjs';
import { TimeoutError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    timeout(20000), // 20 segundos de timeout
    catchError((err) => {
      // No interceptar errores de endpoints de autenticación
      const isAuthEndpoint = req.url.includes('/auth/');

      if (err instanceof TimeoutError) {
        console.warn('Timeout: el servidor tardó demasiado. Verifica que Render esté activo.');
        return throwError(() => ({ status: 0, message: 'Timeout' }));
      }

      if (!isAuthEndpoint) {
        if (err.status === 401) {
          // Token expirado o inválido — cerrar sesión
          localStorage.removeItem('token');
          localStorage.removeItem('rol');
          localStorage.removeItem('usuarioId');
          router.navigate(['/auth/login']);
        } else if (err.status === 403) {
          // Acceso denegado — el usuario está autenticado pero sin permisos
          console.warn('Acceso denegado: No tienes permisos para esta acción.');
        }
      }
      return throwError(() => err);
    })
  );
};
