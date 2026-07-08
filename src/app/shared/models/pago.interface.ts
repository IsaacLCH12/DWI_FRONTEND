export interface Pago {
  id: number;
  citaId?: number;
  monto: number;
  fecha: string;
  metodoPago?: string;
  estado: string;
}
