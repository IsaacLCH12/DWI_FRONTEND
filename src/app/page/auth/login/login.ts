import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    identificador: ['', Validators.required],
<<<<<<< HEAD
    password: ['', Validators.required]
  });

  mensajeError = '';
  cargando = false;

  onSubmit() {
    if (this.loginForm.valid) {
      this.cargando = true;
      this.mensajeError = '';
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.cargando = false;
=======
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b
          if (res.rol === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else if (res.rol === 'PACIENTE') {
            this.router.navigate(['/paciente']);
<<<<<<< HEAD
          } else if (res.rol === 'MEDICO') {
            this.mensajeError = 'El portal para médicos aún no está disponible.';
            this.authService.logout(); // Cerramos la sesión porque no hay página a donde ir
          } else {
            this.mensajeError = 'Rol no reconocido.';
            this.authService.logout();
          }
        },
        error: (err) => {
          this.cargando = false;
          if (err.status === 403 || err.status === 401) {
            this.mensajeError = 'Credenciales incorrectas. Verifica tu usuario y contraseña.';
          } else if (err.status === 0) {
            this.mensajeError = 'No se pudo conectar con el servidor. Intenta más tarde.';
          } else {
            this.mensajeError = 'Ocurrió un error inesperado. Intenta de nuevo.';
          }
        }
=======
          }
        },
        error: () => alert('Credenciales incorrectas. Verifica tu DNI/Correo y contraseña.')
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b
      });
    }
  }
}
