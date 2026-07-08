import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [CommonModule, Navbar],
  template: `
    <app-navbar></app-navbar>
    <div class="info-container">
      <div class="info-card">
        <h1>{{ titulo }}</h1>
        <div class="info-content" [innerHTML]="contenido"></div>
      </div>
    </div>
  `,
  styles: [`
    .info-container {
      padding: 4rem 2rem;
      background: #f8fafc;
      min-height: calc(100vh - 70px);
      display: flex;
      justify-content: center;
    }
    .info-card {
      background: white;
      padding: 3rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
      max-width: 800px;
      width: 100%;
    }
    h1 {
      color: #0f4c81;
      font-size: 2rem;
      margin-bottom: 2rem;
      border-bottom: 2px solid #f1f5f9;
      padding-bottom: 1rem;
    }
    .info-content {
      color: #475569;
      line-height: 1.8;
      font-size: 1.05rem;
    }
  `]
})
export class Informacion implements OnInit {
  titulo: string = '';
  contenido: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      const path = urlSegments[0].path;
      
      switch(path) {
        case 'trabaja-con-nosotros':
          this.titulo = 'Trabaja con Nosotros';
          this.contenido = '<p>Únete a nuestro equipo de profesionales de la salud. En el Centro de Salud Poquian siempre estamos en la búsqueda de talento comprometido con el bienestar de nuestros pacientes.</p><p>Envía tu CV a <strong>rrhh@poquian.pe</strong> indicando el puesto al que postulas en el asunto.</p>';
          break;
        case 'politica-privacidad':
          this.titulo = 'Política de Privacidad';
          this.contenido = '<p>Tu privacidad es importante para nosotros. Esta política explica cómo recopilamos, usamos y protegemos tus datos personales en cumplimiento con la Ley de Protección de Datos Personales.</p><p>Toda información médica es tratada con estricta confidencialidad y solo es accesible por el personal médico autorizado.</p>';
          break;
        case 'terminos-condiciones':
          this.titulo = 'Términos y Condiciones';
          this.contenido = '<p>Al utilizar nuestra plataforma de reservas, aceptas nuestros términos de servicio. Las citas deben ser canceladas con al menos 24 horas de anticipación.</p><p>El Centro de Salud se reserva el derecho de reprogramar citas en caso de emergencias médicas del especialista.</p>';
          break;
        case 'reclamaciones':
          this.titulo = 'Libro de Reclamaciones';
          this.contenido = '<p>Conforme a lo establecido en el Código de Protección y Defensa del Consumidor, contamos con un Libro de Reclamaciones virtual a tu disposición.</p><p>Para ingresar un reclamo o queja, por favor acércate a la recepción de cualquiera de nuestras sedes físicas.</p>';
          break;
        default:
          this.titulo = 'Información Institucional';
          this.contenido = '<p>Información general del Centro de Salud Poquian.</p>';
      }
    });
  }
}
