import { Routes } from '@angular/router';
import { Login } from './page/auth/login/login';
import { Registro } from './page/auth/registro/registro';
// Importa tus componentes finales aquí
// import { MisCitas } from './page/paciente/mis-citas/mis-citas'; 

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: Login },
  { path: 'auth/registro', component: Registro },
  // Aquí puedes agregar tus rutas directas sin layouts
  // { path: 'paciente/mis-citas', component: MisCitas }
  { path: '**', redirectTo: 'auth/login' }
];
