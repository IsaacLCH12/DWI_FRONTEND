export interface Cita {
  id: number;
  pacienteId: number;
  medicoId: number;
  medicoNombre?: string;
  servicioNombre?: string;
  sedeNombre?: string;
  fecha: string;
  hora: string;
  estado: 'PENDIENTE' | 'ATENDIDO' | 'CANCELADO';
}

export interface CrearCitaDTO {
  sedeId: number | null;
  servicioId: number | null;
  medicoId: number | null;
  horarioId: number | null;
  pacienteId: string | null;
}
