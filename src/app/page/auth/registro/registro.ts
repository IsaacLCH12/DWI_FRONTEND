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
    }
  }
}
