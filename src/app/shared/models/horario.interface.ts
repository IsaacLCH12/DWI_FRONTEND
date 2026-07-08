export interface Horario {
  id: number;
  medicoId: number;
  fecha: string;
  horaInicio: string;
  horaFin?: string;
  disponible?: boolean;
}
