export interface Pago {
  id: number;
  montoTotal: number;
  metodoPago: string;
  estado: string;
  fechaPago: string;
  nombrePaciente: string;
}