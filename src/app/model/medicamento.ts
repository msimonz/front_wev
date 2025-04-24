import { Tratamiento } from "./tratamiento";

export interface Medicamento {
    id: number;
    nombre: string;
    precioVenta: number;
    precioCompra: number;
    stock: number;
    uvendidas: number;
}
  