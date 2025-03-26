import { Tratamiento } from "./tratamiento";

export interface Medicamento {
    id: number;
    nombre: string;
    descripcion: string;
    dosis: string;
    precio: number;
    tratamiento: Tratamiento;
  }
  