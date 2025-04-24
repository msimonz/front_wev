import { Medicamento } from "./medicamento";
import { Mascota } from "./mascota";
import { Veterinario } from "./veterinario";

export interface Tratamiento {
  id: number;
  nombre: string;
  medicamentos: Medicamento[];
  mascota: Mascota;
  veterinario: Veterinario;
}
  