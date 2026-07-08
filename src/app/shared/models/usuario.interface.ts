export interface Usuario {
  id?: number;
  nombre: string;
  apellido: string;
  dni: string;
  correo: string;
  telefono?: string;
  fechaNacimiento?: string;
  direccion?: string;
  rol: string;
  token?: string;
}
