import { Cita } from "./cita";
import { Mascota } from "./mascota";

export interface Cliente {
    id: number;
    nombre: string;
    usuario: string;
    apellido: string;
    telefono: string;
    email: string;
    contrasena: string;
    mascotas?: Mascota[];
    citas?: Cita[];
}