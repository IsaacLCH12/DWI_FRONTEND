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
    }
  }
}
