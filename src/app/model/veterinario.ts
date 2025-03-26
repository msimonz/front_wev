import { Tratamiento } from "./tratamiento";


export interface Veterinario {
    id: number;
    nombre: string;
    telefono: string;
    email: string;
    usuario: string;
    contrasena: string;
    tratamientos: Tratamiento[];
  }
  