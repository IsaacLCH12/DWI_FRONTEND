import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner-carga',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner-carga.html',
  styleUrls: ['./spinner-carga.scss']
})
export class SpinnerCarga {
  @Input() visible: boolean = false;
}
