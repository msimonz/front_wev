import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-cliente-table',
  templateUrl: './cliente-table.component.html',
  styleUrls: ['./cliente-table.component.css']
})
export class ClienteTableComponent implements OnInit {
  clienteSeleccionado!: Cliente;
  clienteActualizar!: Cliente;
  clientes: Cliente[] = [];

  @Output() clienteEliminado = new EventEmitter<Cliente>();
  
  constructor(private clienteService: ClienteService) {}
  ngOnInit(): void {
    this.cargarClientes();
  }
  
  cargarClientes() {
      this.clienteService.findAll().subscribe({
        next: (clientes) => (this.clientes = clientes),
        error: (err) => console.error('Error al cargar clientes:', err)
      });
    }
  
    eliminarCliente(cliente: Cliente) {
      if (confirm(`¿Está seguro de eliminar a ${cliente.nombre}?`)) {
        this.clienteService.deleteCliente(cliente.id).subscribe({
          next: () => {
            this.clienteEliminado.emit(cliente);
            this.cargarClientes();
          },
          error: (err) => console.error('Error al eliminar cliente:', err)
        });
      }
    }
  
    agregarCliente(cliente: Cliente) {
      this.clienteService.addCliente(cliente).subscribe({
        next: () => this.cargarClientes(),
        error: (err) => console.error('Error al agregar mascota:', err)
      });
    }
  
    actualizarMascota(cliente: Cliente) {
      this.clienteService.updateCliente(cliente).subscribe({
        next: () => this.cargarClientes(),
        error: (err) => console.error('Error al actualizar mascota:', err)
      });
    }
}
