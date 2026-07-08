import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-confirmacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-confirmacion.html',
  styleUrls: ['./modal-confirmacion.scss']
})
export class ModalConfirmacion {
  @Input() visible: boolean = false;
  @Input() titulo: string = '¿Estás seguro?';
  @Input() mensaje: string = '¿Deseas continuar con esta acción? No se puede deshacer.';
  @Input() textoConfirmar: string = 'Sí, continuar';
  @Input() textoCancelar: string = 'No, cancelar';
  @Output() onConfirmar = new EventEmitter<void>();
  @Output() onCancelar = new EventEmitter<void>();
}
