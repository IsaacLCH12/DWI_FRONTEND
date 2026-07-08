import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrls: ['./registro.scss']
})
export class Registro {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registroForm: FormGroup = this.fb.group({
<<<<<<< HEAD
    dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^\d{8}$/)]],
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    apellido: ['', [Validators.required, Validators.minLength(2)]],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  mensajeError = '';
  cargando = false;

  onSubmit() {
    if (this.registroForm.valid) {
      this.cargando = true;
      this.mensajeError = '';
      this.authService.registro(this.registroForm.value).subscribe({
        next: () => {
          this.cargando = false;
          alert('Cuenta creada exitosamente. Por favor, inicia sesión.');
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.cargando = false;
          if (err.status === 400) {
            this.mensajeError = 'Datos inválidos. Verifica que el DNI y correo no estén ya registrados.';
          } else if (err.status === 0) {
            this.mensajeError = 'No se pudo conectar con el servidor. Intenta más tarde.';
          } else {
            this.mensajeError = 'Error al crear la cuenta. Intenta de nuevo.';
          }
        }
      });
=======
    dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.registroForm.valid) {
      this.authService.registro(this.registroForm.value).subscribe({
        next: (res) => {
          alert('¡Cuenta creada con éxito! Serás redirigido a tu panel de salud.');
          // Como tu backend devuelve el token directo al registrar, podemos loguearlo automáticamente
          localStorage.setItem('token', res.token);
          localStorage.setItem('rol', res.rol);
          localStorage.setItem('usuarioId', res.usuarioId.toString());
          
          this.router.navigate(['/paciente']);
        },
        error: (err) => {
          alert('Error al registrar. Es posible que el DNI ya esté en uso.');
        }
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
>>>>>>> c99f0f454faa7a2b67af88f1870e37e9121a8d4b
    }
  }
}
