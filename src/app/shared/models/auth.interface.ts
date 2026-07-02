export interface IniciarSesionRequest {
  identificador: string; // Puede ser DNI o Correo
  password: string;
}

export interface AuthResponse {
  token: string;
  rol: string;      // Llega "ADMIN" o "PACIENTE"
  usuarioId: number;
}
